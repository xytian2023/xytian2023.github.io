    // main function
    $(function(){
        load_partial('nav_data').then(function() {
            var source = $('.nav_data_tpl').html();
            var template = Handlebars.compile(source);
            var data = {};
            var html = template(data);
            $('#m_nav_container').html(html);
            $('#nav_container').html(html);
            others();
        });


        // load content template for computer
        load_partial('content').then(function() {
            var source = $('.content_tpl').html();
            var template = Handlebars.compile(source);
            var data = {};
            var html = template(data);
            $('#content_container').html(html);
            others();

            setTimeout(function() { //fix the issue of map not filling the container
             show_map('map_computer');
         }, 100);
        });


        // load content template for  mobile
        load_partial('mobile_content').then(function() {
            var source_m = $('.m_content_tpl').html();
            var template_m = Handlebars.compile(source_m);
            var data = {};
            var html = template_m(data);
            $('#m_content_container').html(html);
            others();
            show_map('map_mobile');
        });

    });


    //function to show the map
    function show_map(id_name){
        var map = L.map(id_name).setView([37.7749, -122.4194], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        // when change to the tab: location-page
        $('a[data-tab="location-page"]').on('click', function() {
          // get the current position for user
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
              // set it as map center
              map.setView([position.coords.latitude, position.coords.longitude], 13);

              // show position data in the title.
//              $('a[data-tab="location-page"]').text('Location (' + map.getCenter().toString() + ')');
              $('#map_computer, #map_mobile').prev('h2').text('Location Page - ' + map.getCenter().toString());

              // add a marker, mark user's position
              var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);


              marker.bindPopup("You are here!").openPopup();
            });
            //IMPORTANT: update the layout when container size changed
            map.invalidateSize();  //for refresh
          } else {
            alert("Geolocation is not supported by your browser.");
          }
        });
    }


    //Function to jump to tab
    function jummp_to_toytab(){
        var toy_array = ["#jump-to-toy1", "#jump-to-toy2", "#jump-to-toy3",
        "#m-jump-to-toy1", "#m-jump-to-toy2", "#m-jump-to-toy3"];
        $.each(toy_array, function(index, toy_id){
            var accordion_id = '#toy' + toy_id.slice(-1) + '-accordion' ;
            $(toy_id).on('click',function(){
                $(".menu .item[data-tab='products-page'").tab('change tab', 'products-page')
                $(accordion_id).accordion('open', 0)
            });
        });
    };

    //Functions to do all other things: Change tab,  Show side bar, Modal, etc
    function others(){
        $('.ui.menu .item').tab();
        $('.ui.accordion').accordion();

        $('.ui.sidebar').sidebar({
          context: $('.bottom.attached.segment')
        }).sidebar('attach events', '.sidebar.item');

        // Initialize the modal
        $('.ui.modal').modal();


        // Show the modal when the trigger is clicked
        $("#toy1-modal-trigger, #toy2-modal-trigger,#toy3-modal-trigger,#toy4-modal-trigger").each(function(){
            $(this).on('click',function(){
                modal_i = $(this).attr('id').replace('-trigger','')
                $('.ui.modal').modal();
                $("#"+modal_i).modal('show');
            });
        })

        //Click the button of toy1|toy2|toy3 in homepage  ---> then jump(change) to the products-tab
        // ---> and open the respective accordion
        jummp_to_toytab();


        //Click BuyNow button, jump to products tab without any accordion open.
        $("#buy-now, #m-buy-now").each(function(){
            $(this).on('click',function(){
                $(".menu .item[data-tab='products-page'").tab('change tab', 'products-page')
            });
        });
    }


    //Fucntion to load template asynchronously.
    var load_partial = async function(name) {
      var html = await $.ajax({url:'partials/' + name + '.html',type:'GET'});
      Handlebars.registerPartial(name, html);
    };







