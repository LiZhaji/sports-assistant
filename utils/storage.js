// utils/storage.js
// 封装本地存储操作

/**
 * 设置本地存储
 * @param {string} key - 存储键名
 * @param {any} value - 存储值
 */
export function setStorage(key, value) {
  try {
    wx.setStorageSync(key, value);
    return true;
  } catch (e) {
    console.error('设置本地存储失败:', e);
    return false;
  }
}

/**
 * 获取本地存储
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {any} 存储值或默认值
 */
export function getStorage(key, defaultValue = null) {
  try {
    const value = wx.getStorageSync(key);
    return value !== undefined && value !== null ? value : defaultValue;
  } catch (e) {
    console.error('获取本地存储失败:', e);
    return defaultValue;
  }
}

/**
 * 移除本地存储
 * @param {string} key - 存储键名
 */
export function removeStorage(key) {
  try {
    wx.removeStorageSync(key);
    return true;
  } catch (e) {
    console.error('移除本地存储失败:', e);
    return false;
  }
}

/**
 * 清空本地存储
 */
export function clearStorage() {
  try {
    wx.clearStorageSync();
    return true;
  } catch (e) {
    console.error('清空本地存储失败:', e);
    return false;
  }
}

/**
 * 存储计划数据
 * @param {Object} plan - 计划对象
 */
export function savePlan(plan) {
  const plans = getStorage('plans', []);
  plans.push(plan);
  return setStorage('plans', plans);
}

/**
 * 获取所有计划
 * @returns {Array} 计划数组
 */
export function getAllPlans() {
  return getStorage('plans', []);
}

/**
 * 根据ID获取计划
 * @param {string} id - 计划ID
 * @returns {Object|null} 计划对象
 */
export function getPlanById(id) {
  const plans = getAllPlans();
  return plans.find(plan => plan.id === id) || null;
}

/**
 * 更新计划
 * @param {string} id - 计划ID
 * @param {Object} updatedPlan - 更新后的计划对象
 * @returns {boolean} 是否更新成功
 */
export function updatePlan(id, updatedPlan) {
  const plans = getAllPlans();
  const index = plans.findIndex(plan => plan.id === id);
  
  if (index !== -1) {
    plans[index] = { ...plans[index], ...updatedPlan };
    return setStorage('plans', plans);
  }
  
  return false;
}

/**
 * 删除计划
 * @param {string} id - 计划ID
 * @returns {boolean} 是否删除成功
 */
export function deletePlan(id) {
  const plans = getAllPlans();
  const newPlans = plans.filter(plan => plan.id !== id);
  return setStorage('plans', newPlans);
}

/**
 * 保存运动记录
 * @param {Object} record - 运动记录对象
 */
export function saveWorkoutRecord(record) {
  const records = getStorage('workoutRecords', []);
  records.push(record);
  return setStorage('workoutRecords', records);
}

/**
 * 获取运动记录
 * @returns {Array} 运动记录数组
 */
export function getWorkoutRecords() {
  return getStorage('workoutRecords', []);
}