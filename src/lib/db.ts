import { init, i } from "@instantdb/react-native";

export const APP_ID = "13eea2e1-b92d-41c8-b665-aba1c5431718";

const schema = i.schema({
  entities: {
    moments: i.entity({
      id: i.string(),
      title: i.string(),
      date: i.string(),
      image: i.string(),
    }),
  },
});

export const db = init({ appId: APP_ID, schema });
