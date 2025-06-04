import { writable } from 'svelte/store';

// 游戏模式状态: 'initial', 'typeSelection', 'quiz', 'results'
export const gameModeStore = writable('initial');

// 题目类型: 'fill-in', 'multiple-choice'
export const questionTypeStore = writable('fill-in');

// 存储当前生成的10道题目对象数组
export const questionsStore = writable([]);

// 存储判题后的得分
export const scoreStore = writable(0); 