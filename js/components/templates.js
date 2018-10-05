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
<div class='list links-list'> \
  <ul>\
    {{#each steps}} \
      <li id = '{{@index}}/{{doc.name}}'><a href='/step/{{@index}}/{{doc.name}}/'> \
      {{doc.name}} \
      </a></li> \
    {{/each}} \
    <li class = 'add_button' id = 'add_button_steps'><i class='add_button f7-icons'>add_round</i></li> \
  </ul> \
</div> ";
