type MdxPage = {
  code: string;
  frontmatter: {
    archived?: boolean;
    draft?: boolean;
    title?: string;
    description?: string;
    meta?: {
      keywords?: Array<string>;
      [key: string]: unknown;
    };
    categories?: Array<string>;
    date?: string;
    ImageURL: string;
    socialImageTitle?: string;
    socialImagePreTitle?: string;
  };
};
