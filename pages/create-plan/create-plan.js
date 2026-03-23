// pages/create-plan/create-plan.js
Page({
  data: {
    // 计划数据
    plan: {
      name: '',
      type: '', // 'audio', 'video', 'running'
      typeName: '请选择',
      mediaUrl: '',
      mediaInfo: {
        title: '',
        cover: '',
        duration: ''
      },
      targetValue: '',
      targetType: '', // 'duration', 'distance'
      targetTypeName: '请选择',
      repeat: 'once', // 'once', 'daily', 'weekly'
      repeatText: '仅一次',
      time: '08:00',
      remind: true,
      remindTime: 5, // 提前提醒时间（分钟）
      remindTimeText: '5分钟'
    },
    
    // 选择器数据
    showTypePicker: false,
    showRepeatPicker: false,
    showTimePicker: false,
    showTargetTypePicker: false,
    showRemindTimePicker: false,
    
    typeColumns: [
      { text: '音频跟练', value: 'audio' },
      { text: '视频跟练', value: 'video' },
      { text: '户外跑步', value: 'running' }
    ],
    
    repeatColumns: [
      { text: '仅一次', value: 'once' },
      { text: '每天', value: 'daily' },
      { text: '每周特定日期', value: 'weekly' }
    ],
    
    targetTypeColumns: [
      { text: '时长（分钟）', value: 'duration' },
      { text: '距离（公里）', value: 'distance' }
    ],
    
    remindTimeColumns: [
      { text: '不提醒', value: 0 },
      { text: '5分钟', value: 5 },
      { text: '10分钟', value: 10 },
      { text: '15分钟', value: 15 },
      { text: '30分钟', value: 30 }
    ],
    
    saving: false
  },

  onLoad() {
    // 页面加载逻辑
  },

  // 显示类型选择器
  showTypePicker() {
    this.setData({
      showTypePicker: true
    });
  },

  // 确认类型选择
  confirmType(e) {
    const { value, index } = e.detail;
    this.setData({
      'plan.type': value,
      'plan.typeName': this.data.typeColumns[index].text,
      showTypePicker: false
    });
  },

  // 关闭类型选择器
  closeTypePicker() {
    this.setData({
      showTypePicker: false
    });
  },

  // 显示重复周期选择器
  showRepeatPicker() {
    this.setData({
      showRepeatPicker: true
    });
  },

  // 确认重复周期选择
  confirmRepeat(e) {
    const { value, index } = e.detail;
    this.setData({
      'plan.repeat': value,
      'plan.repeatText': this.data.repeatColumns[index].text,
      showRepeatPicker: false
    });
  },

  // 关闭重复周期选择器
  closeRepeatPicker() {
    this.setData({
      showRepeatPicker: false
    });
  },

  // 显示时间选择器
  showTimePicker() {
    this.setData({
      showTimePicker: true
    });
  },

  // 确认时间选择
  confirmTime(e) {
    const time = e.detail;
    this.setData({
      'plan.time': time,
      showTimePicker: false
    });
  },

  // 关闭时间选择器
  closeTimePicker() {
    this.setData({
      showTimePicker: false
    });
  },

  // 显示目标类型选择器
  showTargetTypePicker() {
    this.setData({
      showTargetTypePicker: true
    });
  },

  // 确认目标类型选择
  confirmTargetType(e) {
    const { value, index } = e.detail;
    this.setData({
      'plan.targetType': value,
      'plan.targetTypeName': this.data.targetTypeColumns[index].text,
      showTargetTypePicker: false
    });
  },

  // 关闭目标类型选择器
  closeTargetTypePicker() {
    this.setData({
      showTargetTypePicker: false
    });
  },

  // 显示提醒时间选择器
  showRemindTimePicker() {
    this.setData({
      showRemindTimePicker: true
    });
  },

  // 确认提醒时间选择
  confirmRemindTime(e) {
    const { value, index } = e.detail;
    this.setData({
      'plan.remindTime': value,
      'plan.remindTimeText': this.data.remindTimeColumns[index].text,
      showRemindTimePicker: false
    });
  },

  // 关闭提醒时间选择器
  closeRemindTimePicker() {
    this.setData({
      showRemindTimePicker: false
    });
  },

  // 解析媒体链接
  parseMediaUrl() {
    // 模拟解析链接
    if (!this.data.plan.mediaUrl) {
      wx.showToast({
        title: '请输入媒体链接',
        icon: 'none'
      });
      return;
    }
    
    // 模拟解析过程
    wx.showToast({
      title: '正在解析...',
      icon: 'loading'
    });
    
    setTimeout(() => {
      // 模拟解析成功
      this.setData({
        'plan.mediaInfo.title': '晨间瑜伽课程',
        'plan.mediaInfo.cover': 'https://example.com/cover.jpg',
        'plan.mediaInfo.duration': '30分钟'
      });
      
      wx.showToast({
        title: '解析成功',
        icon: 'success'
      });
    }, 1000);
  },

  // 保存计划
  savePlan() {
    const plan = this.data.plan;
    
    // 验证必填字段
    if (!plan.name) {
      wx.showToast({
        title: '请输入运动名称',
        icon: 'none'
      });
      return;
    }
    
    if (!plan.type) {
      wx.showToast({
        title: '请选择运动类型',
        icon: 'none'
      });
      return;
    }
    
    // 根据类型验证其他字段
    if ((plan.type === 'audio' || plan.type === 'video') && !plan.mediaUrl) {
      wx.showToast({
        title: '请输入媒体链接',
        icon: 'none'
      });
      return;
    }
    
    if (plan.type === 'running' && !plan.targetValue) {
      wx.showToast({
        title: '请输入目标值',
        icon: 'none'
      });
      return;
    }
    
    if (plan.type === 'running' && !plan.targetType) {
      wx.showToast({
        title: '请选择目标类型',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      saving: true
    });
    
    // 模拟保存过程
    setTimeout(() => {
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 1000);
    }, 1000);
  }
})