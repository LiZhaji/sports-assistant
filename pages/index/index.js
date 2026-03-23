// pages/index/index.js
Page({
  data: {
    todayPlans: [],
    currentDate: new Date(),
    calendarFormatter: (day) => {
      const date = day.date.getDate();
      // 这里可以添加日历标记逻辑
      return day;
    }
  },

  onLoad() {
    this.loadTodayPlans();
  },

  onShow() {
    this.loadTodayPlans();
  },

  loadTodayPlans() {
    // 模拟加载今日计划数据
    const plans = [
      {
        id: 1,
        name: '晨间瑜伽',
        time: '08:00',
        status: 'pending'
      },
      {
        id: 2,
        name: '夜跑5公里',
        time: '19:30',
        status: 'completed'
      }
    ];
    this.setData({
      todayPlans: plans
    });
  },

  navigateToCreate() {
    wx.navigateTo({
      url: '/pages/create-plan/create-plan'
    });
  },

  onCalendarConfirm(e) {
    console.log('选择的日期:', e.detail);
    // 这里可以处理日期选择逻辑
  }
})