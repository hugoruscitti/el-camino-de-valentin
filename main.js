document.addEventListener("DOMContentLoaded", function() {
  
  const UN_DIA = 1000 * 60 * 60 * 24;
  // fecha de gestación y fecha actual.
  const comienzo = new Date(2023, 10, 8)
  const hoy = new Date();

  // diferencia entre fechas, milisegundos, días y semanas.
  const diff_en_ms = new Date(hoy) - new Date(comienzo)
  const dias = diff_en_ms / (UN_DIA);
  const semana_actual = parseInt(dias/7);

  // semanas de 0 a 39...
  const semanas = [...Array(40).keys()];

  // retorna una lista de números de días a partir
  // de la semana.
  function dias_de_la_semana(semana) {
    return [1, 2, 3, 4, 5, 6, 7].map(n => n+semana*7);
  }

  function obtener_clase_para_el_dia(dia, dias) {
    if (dia<dias) {
      return "done";
    } else {
      if (dia==Math.ceil(dias)) {
        return "hoy";
      } else {
        return "wait";
      }
    }
  }

  const data = semanas.map(semana => {
      return {
        semana: semana,
        fecha: new Date(comienzo.getTime() + UN_DIA * semana*7),
        clase: (semana == semana_actual)?"actual": "",
        dias: dias_de_la_semana(semana).map(dia => {
          return {
            clase: obtener_clase_para_el_dia(dia, dias),
          }
        })
      }
    }
  );

  function formatear_fecha(fecha) {
    var options = { month: 'short', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', options);
  }


  // Dibuja el contenido en la página:
  const tabla = document.querySelector("tbody");

  data.map(semana => {
    let tr = document.createElement("tr")

    let dias = semana.dias.map(dia => {

      if (dia.clase === "hoy") {
        return `<div class="today"><img src='corazon.png'></div>`
      } else {
        return `<span class="${dia.clase}"></span>`;
      }

      return `<span class="${dia.clase}"></span>`;
    });



    tr.innerHTML = `
      <td class="semana ${semana.clase}">Semana ${semana.semana+1}</td>
      <td class="dias">
        ${dias.join("")}
      </td>
      <td>
        ${formatear_fecha(semana.fecha)}
      </td>
    `;


    tabla.appendChild(tr);
  });


});
