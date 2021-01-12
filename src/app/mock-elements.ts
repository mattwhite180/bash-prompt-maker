import { Element } from './element';

let start: string = '\\' + '[\\' + 'e[';
let color: string = "37";
let end: string = 'm\\' + ']'
//\[\e["$PURPLE"m\][\d]
export const ELEMENTS: Element[] = [
  { id: 11, name: 'working-dir', value: start + color + end + '\\w', color: "white" },
  { id: 12, name: 'hostname', value: start + color + end + '\\h', color: "white" },
  { id: 13, name: 'date', value: start + color + end + '\\d', color: "white" },
  { id: 14, name: 'prompt', value: ':)', color: "white" },
  { id: 14, name: 'username', value: 'usr', color: "white" },
  { id: 14, name: '@', value: '@', color: "white" },
];