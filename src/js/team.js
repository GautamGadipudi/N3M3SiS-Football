$(document).ready(function() {
  $('.loader').css('visibility', 'hidden');

  $('.basic-div').show();
  $('.squad-div').hide();
  $('.transfers-div').hide();
  $('.stats-div').hide();

  $('#logo').on('click', function() {
    window.location.href = 'index.html'
  });

  function getBasicTableRow(header, value) {
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
    document.title = document.title.split(" - ")[0] + " - Basic";
    $('.basic-div').show();
  })

  $('#squad').on('click', function() {
    document.title = document.title.split(" - ")[0] + " - Squad";
    hideAllContents();
    $('.squad-div').show();
  })

  $('#transfers').on('click', function() {
    document.title = document.title.split(" - ")[0] + " - Transfers";
    hideAllContents();
    $('.transfers-div').show();
  })

  $('#stats').on('click', function() {
    document.title = document.title.split(" - ")[0] + " - Statistics";
    hideAllContents();
    $('.stats-div').show();
  })

  function loadBasic(r) {
    $('.basic-table-body').append(getBasicTableRow("Country", r.country));
    $('.basic-table-body').append(getBasicTableRow("Founded", r.founded));
    $('.basic-table-body').append(getBasicTableRow("Home Ground", r.venue_name));
    $('.basic-table-body').append(getBasicTableRow("Coach", r.coach_name));
  }

  function loadSquad(_squad) {
    for (var i = 0; i < _squad.length; i++) {
      switch (_squad[i].position) {
        case "G":
          var li = $('<li/>').html(_squad[i].name + ' (' + _squad[i].number + ')');
          $('#gk-ul').append(li);
          break;
        case "D":
          var li = $('<li/>').html(_squad[i].name + ' (' + _squad[i].number + ')');
          $('#def-ul').append(li);
          break;
        case "M":
          var li = $('<li/>').html(_squad[i].name + ' (' + _squad[i].number + ')');
          $('#mid-ul').append(li);
          break;
        case "A":
          var li = $('<li/>').html(_squad[i].name + ' (' + _squad[i].number + ')');
          $('#att-ul').append(li);
          break;
      }
    }
  }

  function loadTransfers(_transfers_in, _transfers_out) {
    for (var i = 0; i < _transfers_in.length; i++) {
      var from_team = _transfers_in[i].from_team;
      if (from_team == undefined)
        from_team = 'Unknown';
      var tr = $('<tr/>');
      tr.append($('<td/>').html(_transfers_in[i].name));
      tr.append($('<td/>').html(from_team));
      tr.append($('<td/>').html(_transfers_in[i].date));
      tr.append($('<td/>').html(_transfers_in[i].type));
      $('#transfers-in-table-body').append(tr);
    }
    for (var i = 0; i < _transfers_out.length; i++) {
      var to_team = _transfers_out[i].to_team;
      if (to_team == undefined)
        to_team = 'Unknown';
      var tr = $('<tr/>');
      tr.append($('<td/>').html(_transfers_out[i].name));
      tr.append($('<td/>').html(to_team));
      tr.append($('<td/>').html(_transfers_out[i].date));
      tr.append($('<td/>').html(_transfers_out[i].type));
      $('#transfers-out-table-body').append(tr);
    }
  }

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
      document.title = r.name + ' - Basic';
      $('.team-name').html(r.name);
      loadBasic(r);
      loadSquad(r.squad);
      loadTransfers(r.transfers_in, r.transfers_out);
    },
    error: function(r) {
      console.error(r);
    }
  })
})
