import mockData from "./mock/cardInformation.json";

export function getData() {
    return new Promise(res => setTimeout (()=>res({data: mockData })));
}