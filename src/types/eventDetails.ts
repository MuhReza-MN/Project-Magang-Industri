export type EventDetails = {
  intro: string;
  sections: {
    id: string;
    title: string;
    items: {
      id: string;
      text: string;
    }[];
  }[];
};
