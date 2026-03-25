import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const getCurrentDocumentDirectory = () => {
  if (typeof window === "undefined") return "";

  const hash = window.location.hash || "";
  const cleaned = hash.split("?")[0];
  const match = cleaned.match(/^#\/collections\/(?:edit|duplicate)\/[^/]+\/~\/(.+)$/);
  if (!match?.[1]) return "";

  const parts = decodeURIComponent(match[1]).split("/").filter(Boolean);
  if (parts.length <= 1) return "";

  parts.pop();
  return parts.join("/");
};

const toSlug = (value: string) => {
  const normalized = value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[\\/:*?"<>|#\[\]@!$&'()*+,;=]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "entry";
};

const normalizeDatedFilename = (input: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const raw = input.trim().replace(/\.md$/i, "").replace(/\/index$/i, "");
  const withDate = /^\d{4}-\d{2}-\d{2}-/.test(raw) ? raw : `${today}-${toSlug(raw)}`;
  return `${withDate}/index`;
};

export default defineConfig({
  branch,

  clientId: null,
  token: null,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: ".",
    },
  },
  search: undefined,
  cmsCallback: (cms) => {
    if (typeof window !== "undefined") {
      // デフォルトソート設定
      const key = "tinacms.admin.collection.list.page";
      const defaultSort = JSON.stringify({
        name: "update",
        order: "desc",
      });

      ["blog", "news", "docs"].forEach((collectionName) => {
        window.localStorage.setItem(`${key}.${collectionName}`, defaultSort);
      });

      // 画像保存先の設定
      const patchedKey = "tinacms.media.persist.useDocDir";
      const win = window as unknown as Record<string, unknown>;
      if (!win[patchedKey]) {
        const originalPersist = cms.media.persist.bind(cms.media);
        cms.media.persist = async (media) => {
          const directory = getCurrentDocumentDirectory();
          if (!directory) {
            return originalPersist(media);
          }

          const adjusted = media.map((item) => {
            if (item.directory) return item;
            return { ...item, directory };
          });

          return originalPersist(adjusted);
        };
        win[patchedKey] = true;
      }
    }

    return cms;
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog",
        path: "blog",
        match: {
          include: "**/index",
        },
        format: "md",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              const title = values?.title || "untitled";
              return normalizeDatedFilename(title);
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
          },
          {
            type: "string",
            name: "authors",
            label: "Authors",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: false,
          },
          {
            type: "datetime",
            name: "update",
            label: "Update Date",
            required: false,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "news",
        label: "News",
        path: "news",
        match: {
          include: "**/index",
        },
        format: "md",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              const title = values?.title || "untitled";
              return normalizeDatedFilename(title);
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: false,
          },
          {
            type: "string",
            name: "authors",
            label: "Authors",
            list: true,
            required: false,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            required: false,
          },
          {
            type: "datetime",
            name: "update",
            label: "Update Date",
            required: false,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "docs",
        label: "Docs",
        path: "docs",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "number",
            name: "sidebar_position",
            label: "Sidebar Position",
            required: false,
          },
          {
            type: "string",
            name: "authors",
            label: "Authors",
            list: true,
            required: false,
          },
          {
            type: "datetime",
            name: "create",
            label: "Created Date",
            required: false,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "",
            },
          },
          {
            type: "datetime",
            name: "update",
            label: "Update Date",
            required: false,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
