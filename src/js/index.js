/*
 * @Author: 王鑫磊 
 * @Date: 2018-12-01 11:15:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-02 19:04:46
 */


new BScroll('.wrap')
$.ajax({
    url:'/getData',
    dataType:"json",
    success:function(res){
        xuanran(res.list)
    }
})

function xuanran(data){

    console.log(data)

    for(var i in data){
        var html = ``;
        html+=`<div class="swiper-slide">`

        data[i].forEach(function(file){
            html+= `<dl>
            <dt> <img src="${file.url}" alt=""></dt>
            <dd>${file.title}</dd>
            </dl>`
        })
           
        html+=`</div>`
        $('.swiper-wrapper').append(html);
        new Swiper('.swiper-container')
    }

    


    
}

