$(document).ready(function() {
  $('.loader').css('visibility', 'hidden');

  $('.basic-div').show();
  $('.squad-div').hide();
  $('.transfers-div').hide();
  $('.stats-div').hide();

  $('#logo').on('click', function() {
    window.location.href = 'index.html'
  });

  function getTableRow(header, value) {
    var tr = $('<tr/>');
    var th = $('<th>' + header + '</th>');
    var td = $('<td>' + value + '</td>');
    tr.append(th);
    tr.append(td);
    return tr;
  }

  function hideAllContents() {
    $('.basic-div').hide();
    $('.squad-div').hide();
    $('.transfers-div').hide();
    $('.stats-div').hide();
  }

  $('#basic').on('click', function() {
    hideAllContents();
    $('.basic-div').show();
  })

  $('#squad').on('click', function() {
    hideAllContents();
    $('.squad-div').show();
  })

  $('#transfers').on('click', function() {
    hideAllContents();
    $('.transfers-div').show();
  })

  $('#stats').on('click', function() {
    hideAllContents();
    $('.stats-div').show();
  })

  $.ajax({
    url: "http://api.football-api.com/2.0/team/" + window.location.search.split('?id=')[1] + "?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76",
    dataType: 'json',
    type: 'GET',
    beforeSend: function() {
      $('.loader').css('visibility', 'visible');
    },
    complete: function() {
      $('.loader').css('visibility', 'hidden');
    },
    success: function(r) {
      console.log(r);
      $('.team-name').html(r.name);
      $('.basic-table-body').append(getTableRow("Country", r.country));
      $('.basic-table-body').append(getTableRow("Founded", r.founded));
      $('.basic-table-body').append(getTableRow("Home Ground", r.venue_name));
      $('.basic-table-body').append(getTableRow("Coach", r.coach_name));

      var _squad = r.squad;
      for (var i = 0; i < _squad.length; i++) {
        switch (_squad[i].position) {
          case "G":
            var li = $('<li/>').html(_squad[i].name);
            $('#gk-ul').append(li);
            break;
          case "D":
            var li = $('<li/>').html(_squad[i].name);
            $('#def-ul').append(li);
            break;
          case "M":
            var li = $('<li/>').html(_squad[i].name);
            $('#mid-ul').append(li);
            break;
          case "A":
            var li = $('<li/>').html(_squad[i].name);
            $('#att-ul').append(li);
            break;
        }
      }
    },
    error: function(r) {
      console.error(r);
    }
  })
})
