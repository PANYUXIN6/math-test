import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// 创建带本地存储的writable store
function createPersistedStore(key, initialValue) {
    const { subscribe, set, update } = writable(initialValue);
    
    return {
        subscribe,
        set: (value) => {
            if (browser) {
                localStorage.setItem(key, JSON.stringify(value));
            }
            set(value);
        },
        update: (updater) => {
            update((value) => {
                const newValue = updater(value);
                if (browser) {
                    localStorage.setItem(key, JSON.stringify(newValue));
                }
                return newValue;
            });
        },
        // 从本地存储加载数据
        load: () => {
            if (browser) {
                const stored = localStorage.getItem(key);
                if (stored) {
                    try {
                        set(JSON.parse(stored));
                    } catch (e) {
                        console.warn(`Failed to parse stored ${key}:`, e);
                    }
                }
            }
        },
        // 清除本地存储
        clear: () => {
            if (browser) {
                localStorage.removeItem(key);
            }
            set(initialValue);
        }
    };
}

// 游戏模式状态: 'initial', 'typeSelection', 'quiz', 'results'
export const gameModeStore = createPersistedStore('gameMode', 'initial');

// 题目类型: 'fill-in', 'multiple-choice'
export const questionTypeStore = createPersistedStore('questionType', 'fill-in');

// 存储当前生成的10道题目对象数组
export const questionsStore = createPersistedStore('questions', []);

// 存储判题后的得分
export const scoreStore = createPersistedStore('score', 0);

// 在浏览器环境中初始化时加载存储的数据
if (browser) {
    gameModeStore.load();
    questionTypeStore.load();
    questionsStore.load();
    scoreStore.load();
} 