import { Storage } from '@capacitor/storage';

export const setName = async (key:string,value:any) => {
	value = JSON.stringify(value)
  await Storage.set({
    key: key,
    value: value
  });
};

export const getName = async (key:string) => {
  const { value } = await Storage.get({ key: key });
  return value;

};

export const removeName = async (key:string) => {
  await Storage.remove({ key: key });
};