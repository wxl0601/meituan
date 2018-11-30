/*
 * @Author: 王鑫磊 
 * @Date: 2018-10-26 14:20:16 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-26 17:14:48
 */

 $(function(){
     /**
      * 
      */
     //实例化swiper
      var mySwiper = new Swiper(".swiper-container",{
            
            on:{
                slideChange:function(){
                    console.log(this.activeIndex);
                    $(".footer>li").eq(this.activeIndex).addClass("red").siblings().removeClass("red");
                }
            }
     })
      //tab切换效果
     $(".footer>li").click(function(){
        mySwiper.slideTo($(this).index())
     })

     
     //声明变量
     var scrollA = new BScroll("aside",{
         click:true,
     });
     var scrollB = new BScroll(".bos",{
        click:true,
     });
     //ajax请求
     $.ajax({
         url:"json/data.json",
         success:function(result){
             random(eval("("+ result +")"))
         }
     })
     //渲染数据
     function random(data){
         var html="",str="";
         
         $.each(data.result,function(i,v){

            
             if(i==0){
                 str+=`<li class='active'>${v.title}</li>`;
             }else{
                 str+=`<li>${v.title}</li>`;
             }
                html+= `<div class="item"><p><span>—— </span>${v.title}<span> ——</span> </p>

                <div class="conts">`
                 
             $.each(v.data,function(k,y){
                html+=`
                    <li>
                         <img src="${y.img}" alt="">
                         <p>${y.name}</p>
                    </li>`
                      
             })

             html+=`  <img src="images/logo_07.jpg" alt=""> </div>
             </div>  `;
         })

         $("aside>ul").append(str);
         $(".yul").append(html);
         scrollA.refresh();

     }
     
     //点击li切换效果
     $("aside>ul").on("click","li",function(){
         $(this).addClass("active").siblings().removeClass("active");
        console.log($(this).index());
        
         //点击导航切换到对应的数据
         scrollB.scrollToElement($(".yul>.item").get($(this).index()));
         
     })

 })
