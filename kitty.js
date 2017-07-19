for(i = 0; i <= 735; i += 15) {
    var xhrs = new XMLHttpRequest();
    xhrs.open("get", 'http://fakeURL.com/' + i, true);
    xhrs.onreadystatechange = function() 
    {
        if (this.readyState == 4) 
        {
            $(this.responseText).find('a').each(function()
            {           
                var url = $(this).attr('href');
                console.log(url);                                               
            });
        }
    }
    xhrs.send();
}