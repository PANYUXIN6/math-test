/**
 * 判题函数 - 检查用户答案并更新题目状态
 * @param {Array} questions - 题目数组
 * @returns {Object} 判题结果 {score, totalQuestions, correctCount}
 */
export function gradeQuestions(questions) {
    let correctCount = 0;
    
    // 遍历所有题目进行判题
    const gradedQuestions = questions.map(question => {
        const userAnswer = question.userAnswer;
        const correctAnswer = question.correctAnswer;
        
        // 判断答案是否正确
        let isCorrect = false;
        if (userAnswer !== null && userAnswer !== undefined) {
            isCorrect = Number(userAnswer) === Number(correctAnswer);
        }
        
        if (isCorrect) {
            correctCount++;
        }
        
        return {
            ...question,
            isCorrect
        };
    });
    
    // 计算得分
    const totalQuestions = questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    
    return {
        questions: gradedQuestions,
        score,
        totalQuestions,
        correctCount
    };
}

/**
 * 检查是否所有题目都已回答
 * @param {Array} questions - 题目数组
 * @returns {boolean} 是否全部回答
 */
export function areAllQuestionsAnswered(questions) {
    return questions.every(question => 
        question.userAnswer !== null && 
        question.userAnswer !== undefined && 
        question.userAnswer !== ''
    );
}

/**
 * 获取未回答的题目数量
 * @param {Array} questions - 题目数组
 * @returns {number} 未回答题目数量
 */
export function getUnansweredCount(questions) {
    return questions.filter(question => 
        question.userAnswer === null || 
        question.userAnswer === undefined || 
        question.userAnswer === ''
    ).length;
} 