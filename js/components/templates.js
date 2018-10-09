var template = {};

template.example = " \
<div class='card-content card-content-padding'> \
Hello, my name is {{firstName}} {{lastName}} \
</div>";

template.operations_list = " \
<div class='list links-list'> \
  <ul>\
    {{#each operations}} \
      <li id = '{{doc._id}}'><a href='/operation/{{doc._id}}/{{doc.name}}/'> \
      {{doc.name}} \
      </a></li> \
    {{/each}} \
    <li class = 'add_button' id = 'add_button'><i class='add_button f7-icons'>add_round</i></li> \
  </ul> \
</div> ";


template.steps_list = " \
<div class='list sortable'> \
  <ul>\
    {{#each steps}} \
      <li id = '{{@index}}/{{doc.name}}'>\
        <a href='/step/{{@index}}/{{doc.name}}/'  class='item-link item-content'> \
          <div class='item-inner'>\
            <div class='item-title'>\
                {{doc.name}} \
            </div>\
            <div class='item-after'>\
              {{doc.average_time}}\
            </div>\
          </div>\
        </a>\
        <div class='sortable-handler'></div>\
      </li> \
    {{/each}} \
    <li class = 'add_button' id = 'add_button_steps'><i class='add_button f7-icons'>add_round</i></li> \
  </ul> \
</div> ";

template.time_list = "\
<div class='list sortable'> \
  <ul>\
    {{#each times}} \
      <li id = '{{@index}}'>\
        <div class='item-content'> \
          <div class='item-media'><i class='icon icon-f7'></i></div>\
          <div class='item-inner'>\
            <div class='item-title' >\
                {{time}} \
            </div>\
          </div>\
        </div>\
        <div class='sortable-handler'></div>\
      </li> \
    {{/each}} \
    <li class = 'add_button' id = 'add_button_times'><i class='add_button f7-icons'>add_round</i></li> \
  </ul> \
</div> ";
