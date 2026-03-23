// utils/message.js
// 封装消息相关操作

/**
 * 请求订阅消息
 * @param {Array} tmplIds - 模板ID数组
 * @returns {Promise} 订阅结果
 */
export function requestSubscribeMessage(tmplIds) {
  return new Promise((resolve, reject) => {
    if (!wx.requestSubscribeMessage) {
      console.warn('当前微信版本不支持订阅消息');
      resolve({ errMsg: '不支持订阅消息' });
      return;
    }

    wx.requestSubscribeMessage({
      tmplIds: tmplIds,
      success: (res) => {
        console.log('订阅消息成功:', res);
        resolve(res);
      },
      fail: (err) => {
        console.error('订阅消息失败:', err);
        reject(err);
      }
    });
  });
}

/**
 * 发送订阅消息
 * @param {Object} messageData - 消息数据
 * @returns {Promise} 发送结果
 */
export function sendSubscribeMessage(messageData) {
  return new Promise((resolve, reject) => {
    // 这里应该调用后端API或云函数发送订阅消息
    // 模拟发送过程
    console.log('发送订阅消息:', messageData);
    
    // 模拟发送成功
    setTimeout(() => {
      resolve({
        errMsg: 'sendSubscribeMessage:ok',
        messageId: Date.now().toString()
      });
    }, 1000);
  });
}

/**
 * 格式化订阅消息内容
 * @param {Object} plan - 计划对象
 * @returns {Object} 格式化后的消息内容
 */
export function formatMessageContent(plan) {
  return {
    title: '运动提醒',
    content: `您计划的【${plan.name}】即将开始，时间：${plan.time}`,
    planId: plan.id,
    planName: plan.name,
    planTime: plan.time,
    remindTime: plan.remindTime
  };
}

/**
 * 检查是否已订阅消息
 * @param {string} tmplId - 模板ID
 * @returns {boolean} 是否已订阅
 */
export function isMessageSubscribed(tmplId) {
  // 这里应该检查本地存储的订阅状态
  const subscribedTemplates = wx.getStorageSync('subscribedTemplates') || [];
  return subscribedTemplates.includes(tmplId);
}

/**
 * 记录订阅状态
 * @param {string} tmplId - 模板ID
 */
export function recordSubscription(tmplId) {
  const subscribedTemplates = wx.getStorageSync('subscribedTemplates') || [];
  if (!subscribedTemplates.includes(tmplId)) {
    subscribedTemplates.push(tmplId);
    wx.setStorageSync('subscribedTemplates', subscribedTemplates);
  }
}