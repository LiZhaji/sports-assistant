// pages/workout/workout.js
Page({
  data: {
    plan: {
      id: '',
      name: '晨间瑜伽',
      type: 'audio', // 'audio', 'video', 'running'
      typeName: '音频跟练',
      mediaUrl: 'https://example.com/workout.mp3',
      mediaInfo: {
        title: '晨间瑜伽课程',
        cover: 'https://example.com/cover.jpg',
        duration: '30分钟'
      },
      targetValue: 5,
      targetTypeName: '时长（分钟）',
      time: '08:00'
    },
    
    isPlaying: false,
    isRunning: false,
    currentTime: 0,
    duration: 1800, // 30分钟（秒）
    progress: 0,
    distance: 0,
    elapsedTime: 0,
    
    // 定时器
    timer: null,
    runningTimer: null
  },

  onLoad(options) {
    // 从URL参数获取计划ID
    const planId = options.planId;
    if (planId) {
      // 这里应该从数据库或缓存中加载计划详情
      console.log('加载计划ID:', planId);
      
      // 模拟加载计划数据
      this.setData({
        'plan.id': planId
      });
    }
    
    // 初始化播放器
    this.initPlayer();
  },

  onShow() {
    // 页面显示时的逻辑
  },

  // 初始化播放器
  initPlayer() {
    // 模拟音频播放器初始化
    console.log('播放器初始化完成');
  },

  // 切换播放状态
  togglePlay() {
    if (this.data.isPlaying) {
      this.pausePlay();
    } else {
      this.startPlay();
    }
  },

  // 开始播放
  startPlay() {
    this.setData({
      isPlaying: true
    });
    
    // 模拟播放进度
    this.updateProgress();
  },

  // 暂停播放
  pausePlay() {
    this.setData({
      isPlaying: false
    });
    
    // 清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  // 停止播放
  stopPlay() {
    this.setData({
      isPlaying: false,
      currentTime: 0,
      progress: 0
    });
    
    // 清除定时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
  },

  // 更新播放进度
  updateProgress() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    
    this.data.timer = setInterval(() => {
      if (this.data.isPlaying) {
        const newTime = this.data.currentTime + 1;
        const newProgress = (newTime / this.data.duration) * 100;
        
        this.setData({
          currentTime: newTime,
          progress: newProgress
        });
        
        // 播放结束
        if (newTime >= this.data.duration) {
          this.pausePlay();
        }
      }
    }, 1000);
  },

  // 切换跑步状态
  toggleRunning() {
    if (this.data.isRunning) {
      this.pauseRunning();
    } else {
      this.startRunning();
    }
  },

  // 开始跑步
  startRunning() {
    this.setData({
      isRunning: true
    });
    
    // 开始计时
    this.updateRunning();
  },

  // 暂停跑步
  pauseRunning() {
    this.setData({
      isRunning: false
    });
    
    // 清除定时器
    if (this.data.runningTimer) {
      clearInterval(this.data.runningTimer);
    }
  },

  // 更新跑步数据
  updateRunning() {
    if (this.data.runningTimer) {
      clearInterval(this.data.runningTimer);
    }
    
    this.data.runningTimer = setInterval(() => {
      if (this.data.isRunning) {
        const newTime = this.data.elapsedTime + 1;
        const newDistance = (newTime / 60) * 0.1; // 模拟每分钟0.1公里
        
        this.setData({
          elapsedTime: newTime,
          distance: newDistance.toFixed(2)
        });
      }
    }, 1000);
  },

  // 暂停运动
  pauseWorkout() {
    if (this.data.plan.type === 'audio' || this.data.plan.type === 'video') {
      this.pausePlay();
    } else if (this.data.plan.type === 'running') {
      this.pauseRunning();
    }
    
    wx.showToast({
      title: '已暂停',
      icon: 'none'
    });
  },

  // 结束运动
  endWorkout() {
    wx.showModal({
      title: '确认结束',
      content: '确定要结束本次运动吗？',
      success: (res) => {
        if (res.confirm) {
          this.finishWorkout();
        }
      }
    });
  },

  // 完成运动
  finishWorkout() {
    // 模拟完成运动
    wx.showToast({
      title: '运动完成',
      icon: 'success'
    });
    
    // 保存运动记录
    this.saveWorkoutRecord();
    
    // 返回首页
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }, 1000);
  },

  // 保存运动记录
  saveWorkoutRecord() {
    // 这里应该调用API保存运动记录到数据库
    console.log('保存运动记录:', {
      planId: this.data.plan.id,
      duration: this.data.elapsedTime,
      distance: this.data.distance,
      completed: true
    });
  },

  // 格式化时间
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  onUnload() {
    // 页面卸载时清理定时器
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    if (this.data.runningTimer) {
      clearInterval(this.data.runningTimer);
    }
  }
})