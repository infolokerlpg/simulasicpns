function wpProQuiz_fetchToplist(){var t=this;t.toplist={handleRequest:function(t){jQuery(".wpProQuiz_toplist").each(function(){var e=jQuery(this),i=t[e.data("quiz_id")],o=e.find("tbody tr"),n=o.eq(2);if(o.slice(3).remove(),void 0==i)return o.eq(0).hide().end().eq(1).show(),!0;for(var r=0,u=i.length;u>r;r++){var a=n.clone().children();a.eq(0).text(r+1),a.eq(1).text(i[r].name),a.eq(2).text(i[r].date),a.eq(3).text(i[r].points),a.eq(4).text(i[r].result+" %"),1&r&&a.addClass("wpProQuiz_toplistTrOdd"),a.parent().show().appendTo(e.find("tbody"))}o.eq(0).hide(),o.eq(1).hide()})},fetchIds:function(){var t=new Array;return jQuery(".wpProQuiz_toplist").each(function(){t.push(jQuery(this).data("quiz_id"))}),t},init:function(){var e=t.toplist.fetchIds();0!=e.length&&jQuery.post(WpProQuizGlobal.ajaxurl,{action:"wp_pro_quiz_admin_ajax",func:"showFrontToplist",data:{quizIds:e}},function(e){t.toplist.handleRequest(e)},"json")}},t.toplist.init()}jQuery(document).ready(wpProQuiz_fetchToplist);
