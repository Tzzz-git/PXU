// 全局脚本：导航悬停效果（通过 JS 添加/移除类）+ 简单轮播
document.addEventListener('DOMContentLoaded', function(){
  // 导航 hover 样式（也同时支持键盘 focus）
  const navList = document.getElementById('nav-list');
  if(navList){
    navList.querySelectorAll('li').forEach(li => {
      li.addEventListener('mouseenter', ()=> li.classList.add('hover'));
      li.addEventListener('mouseleave', ()=> li.classList.remove('hover'));
      li.addEventListener('focusin', ()=> li.classList.add('hover'));
      li.addEventListener('focusout', ()=> li.classList.remove('hover'));
    });
  }

  // 简单图片轮播（适用于首页 #main-carousel）
  const carousel = document.getElementById('main-carousel');
  if(carousel){
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    let idx = 0;
    const total = images.length;

    function showIndex(i){
      const w = images[0].clientWidth;
      track.style.transform = `translateX(${-i * w}px)`;
    }

    // 自动轮播
    let timer = setInterval(()=> {
      idx = (idx + 1) % total;
      showIndex(idx);
    }, 4000);

    // 按钮控制
    carousel.querySelectorAll('.carousel-btn').forEach(btn => {
      btn.addEventListener('click', (e)=>{
        const dir = parseInt(btn.getAttribute('data-dir') || "1", 10);
        idx = (idx + dir + total) % total;
        showIndex(idx);
        clearInterval(timer);
        timer = setInterval(()=> { idx = (idx + 1) % total; showIndex(idx); }, 4000);
      });
    });

    // 响应式：在窗口尺寸变换时重新调整位置
    window.addEventListener('resize', ()=> showIndex(idx));
    // 初始化布局延迟（确保图片加载）
    setTimeout(()=> showIndex(idx), 200);
  }

  // 示例：静态表单阻止默认提交并提示
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      alert('表单为静态示例，提交功能需后端支持。可将数据通过 GitHub Pages + Formspree/静态表单服务接入。');
    });
  }
});
