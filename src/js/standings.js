var cups = ['UEFA Champions League', 'UEFA Europa League', 'Fa Cup', 'EFL Cup', 'Copa Del Rey']
$(document).ready(function() {
  $('.loader').css('visibility', 'hidden');

  $('#logo').on('click', function() {
    window.location.href = 'index.html'
  })

  $.ajax({
    url: "http://api.football-api.com/2.0/competitions?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76",
    type: "GET",
    dataType: "json",
    beforeSend: function() {
      $('.loader').css('visibility', 'visible');
    },
    complete: function() {
      $('.loader').css('visibility', 'hidden');
    },
    success: function(r) {
      if (r.length != 0) {
        for (var x = 0; x < r.length; x++) {
          if (cups.indexOf(r[x].name) == -1) {
            $("#competitions-ddl").append(new Option(r[x].name + ' (' + r[x].region + ')', r[x].id));
          }
        }
        getStandings();
      }

    },
    error: function(r) {
      console.error(r);
    }
  })

  function getStandings() {
    $.ajax({
      url: "http://api.football-api.com/2.0/standings/" + $('#competitions-ddl').val() + "?Authorization=565ec012251f932ea4000001fa542ae9d994470e73fdb314a8a56d76",
      type: "GET",
      dataType: "json",
      beforeSend: function() {
        $('.loader').css('visibility', 'visible');
      },
      complete: function() {
        $('.loader').css('visibility', 'hidden');
      },
      success: function(r) {
        r.sort((a, b) => a.points.localeCompare(b.points));
        for (var i = r.length - 1; i >= 0; i--) {
          var tr = $('<tr/>');
          var a = $('<a/>');
          a.attr('href', 'team.html?id=' + r[i].team_id);
          a.html(r[i].team_name);
          tr.append(a);
          tr.append("<td>" + r[i].overall_gp + "</td>");
          tr.append("<td>" + r[i].overall_w + "</td>");
          tr.append("<td>" + r[i].overall_d + "</td>");
          tr.append("<td>" + r[i].overall_l + "</td>");
          tr.append("<td>" + r[i].overall_gs + "</td>");
          tr.append("<td>" + r[i].overall_ga + "</td>");
          tr.append("<td>" + r[i].recent_form + "</td>");
          tr.append("<td>" + r[i].points + "</td>");
          $('#standings-body').append(tr);
        }
      },
      error: function(r) {
        console.error(r);
      }
    })
  }

  $('#competitions-ddl').change(function() {
    $('#standings-body').html('');
    getStandings();
  })
})
