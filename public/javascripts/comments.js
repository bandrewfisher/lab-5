$(document).ready(function() {

    $("#deleteComments").click(function() {
        $.ajax({
            url: "comment",
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
        })
    });
    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });

    $("#getComments").click(function() {
        var url = "comment";
        var name = $("#queryName").val();
        if (name != "" && name != null) {
            url += "?q=" + name;
        }
        $.getJSON(url, function(data) {
            console.log(data);
            if (data.length == 0) {
                $("#comments").html("No comments to display.");
            }
            else {
                var everything = "<ul>";
                for (var comment in data) {
                    com = data[comment];
                    everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
                }
                everything += "</ul>";
                $("#comments").html(everything);
            }
        })
    })


});
