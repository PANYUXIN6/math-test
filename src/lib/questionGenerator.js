/**
 * 题目对象结构
 * @typedef {Object} Question
 * @property {string} id - 题目唯一标识
 * @property {string} text - 题目文本
 * @property {string} type - 题目类型 ('fill-in' | 'multiple-choice')
 * @property {number} num1 - 第一个操作数
 * @property {string} operator - 运算符 ('+', '-', '*', '/')
 * @property {number} num2 - 第二个操作数
 * @property {number} correctAnswer - 正确答案
 * @property {number[]} options - 选择题选项 (仅选择题)
 * @property {number|null} userAnswer - 用户答案
 * @property {boolean|null} isCorrect - 是否正确
 */

/**
 * 生成指定范围内的随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机整数
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成加法题目
 * @returns {Object} 加法题目对象
 */
export function generateAddition() {
    const num1 = randomInt(0, 50);
    const num2 = randomInt(0, 50);
    const correctAnswer = num1 + num2;
    
    // 确保答案不超过100
    if (correctAnswer > 100) {
        return generateAddition();
    }
    
    return {
        num1,
        operator: '+',
        num2,
        correctAnswer,
        text: `${num1} + ${num2}`
    };
}

/**
 * 生成减法题目
 * @returns {Object} 减法题目对象
 */
export function generateSubtraction() {
    const num1 = randomInt(0, 100);
    const num2 = randomInt(0, num1); // 确保被减数大于等于减数
    const correctAnswer = num1 - num2;
    
    return {
        num1,
        operator: '-',
        num2,
        correctAnswer,
        text: `${num1} - ${num2}`
    };
}

/**
 * 生成乘法题目
 * @returns {Object} 乘法题目对象
 */
export function generateMultiplication() {
    // 限制乘数范围以确保积不超过100
    const num1 = randomInt(1, 10);
    const num2 = randomInt(1, Math.floor(100 / num1));
    const correctAnswer = num1 * num2;
    
    return {
        num1,
        operator: '×',
        num2,
        correctAnswer,
        text: `${num1} × ${num2}`
    };
}

/**
 * 生成除法题目
 * @returns {Object} 除法题目对象
 */
export function generateDivision() {
    // 先生成除数和商，再计算被除数
    const num2 = randomInt(1, 10); // 除数
    const quotient = randomInt(1, Math.floor(100 / num2)); // 商
    const num1 = num2 * quotient; // 被除数
    const correctAnswer = quotient;
    
    return {
        num1,
        operator: '÷',
        num2,
        correctAnswer,
        text: `${num1} ÷ ${num2}`
    };
}

/**
 * 为正确答案生成干扰项
 * @param {number} correctAnswer - 正确答案
 * @returns {number[]} 三个干扰项
 */
export function generateDistractors(correctAnswer) {
    const distractors = new Set();
    
    while (distractors.size < 3) {
        let distractor;
        const rand = Math.random();
        
        if (rand < 0.3) {
            // 相近的数字
            distractor = correctAnswer + randomInt(-5, 5);
        } else if (rand < 0.6) {
            // 常见错误：加减1
            distractor = correctAnswer + (Math.random() < 0.5 ? 1 : -1);
        } else {
            // 其他随机数字
            distractor = randomInt(0, 100);
        }
        
        // 确保干扰项非负且不等于正确答案
        if (distractor >= 0 && distractor !== correctAnswer) {
            distractors.add(distractor);
        }
    }
    
    return Array.from(distractors);
}

/**
 * 生成完整的题目对象
 * @param {string} type - 题目类型 ('fill-in' | 'multiple-choice')
 * @returns {Question} 完整的题目对象
 */
function generateQuestion(type) {
    const generators = [generateAddition, generateSubtraction, generateMultiplication, generateDivision];
    const generator = generators[randomInt(0, generators.length - 1)];
    const baseQuestion = generator();
    
    const question = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        ...baseQuestion,
        userAnswer: null,
        isCorrect: null
    };
    
    // 如果是选择题，生成选项
    if (type === 'multiple-choice') {
        const distractors = generateDistractors(baseQuestion.correctAnswer);
        const allOptions = [baseQuestion.correctAnswer, ...distractors];
        
        // 随机打乱选项顺序
        for (let i = allOptions.length - 1; i > 0; i--) {
            const j = randomInt(0, i);
            [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
        }
        
        question.options = allOptions;
    }
    
    return question;
}

/**
 * 生成指定数量的题目
 * @param {string} type - 题目类型 ('fill-in' | 'multiple-choice')
 * @param {number} count - 题目数量
 * @returns {Question[]} 题目数组
 */
export function generateQuestions(type, count = 10) {
    const questions = [];
    const usedQuestions = new Set();
    
    while (questions.length < count) {
        const question = generateQuestion(type);
        const questionKey = `${question.num1}${question.operator}${question.num2}`;
        
        // 避免重复题目
        if (!usedQuestions.has(questionKey)) {
            usedQuestions.add(questionKey);
            questions.push(question);
        }
    }
    
    return questions;
} 