import { AsyncStorage } from 'react-native';

const TAGS = 'MJ_TAGS';

export const syncWithDB = async (days, tags) => {
  await Object.keys(days).map(
    async dayTitle =>
      await AsyncStorage.setItem(dayTitle, JSON.stringify(days[dayTitle]))
  );

  await AsyncStorage.setItem(TAGS, JSON.stringify(tags));
};

export const getAllDays = async () => {
  // await AsyncStorage.clear();
  const keys = (await AsyncStorage.getAllKeys()).filter(d =>
    /^\d+\/\d+\/\d+$/.test(d)
  );

  const days = Object.fromEntries(
    (await AsyncStorage.multiGet(keys)).map(([title, data]) => [
      title,
      JSON.parse(data)
    ])
  );

  const tags = JSON.parse(await AsyncStorage.getItem(TAGS));

  return {
    keys,
    days,
    tags
  };
};
