declare module '*.yaml' {
  const content: {
    [key: string]: {
      id: string;
      path: string;
      name: string;
      description: {
        ja: string;
        en: string;
      };
      publishTime: string;
      creators: {
        name: string;
        role: string;
      }[];
    };
  };
  export default content;
}