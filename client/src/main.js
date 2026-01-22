const API_BASE = 'http://localhost:3000/api/medicamentos';

$(document).ready(() => {

// Filtro por fecha de vencimiento
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        const filtro = $('#filtro-vencimiento').val();
        
        if (!filtro) return true;

        const fechaCelda = new Date(data[4]); 
        const hoy = new Date();
        
        hoy.setHours(0, 0, 0, 0);
        fechaCelda.setHours(0, 0, 0, 0);

        if (filtro === 'expirados') {
            return fechaCelda < hoy;
        }
        
        if (filtro === 'vigentes') {
            return fechaCelda >= hoy;
        }

        return true;
    }
);

$('#filtro-vencimiento').on('change', function() {
    $('#miTabla').DataTable().draw();
});
  
// Función para cargar y renderizar la tabla de medicamentos
  function cargarTabla() {
    $.get(API_BASE, (data) => {
      
      if ($.fn.DataTable.isDataTable('#miTabla')) {
        $('#miTabla').DataTable().destroy();
      }

      const $tbody = $('#tabla-medicamentos');
      $tbody.empty();

      const categoriasUnicas = [...new Set(data.map(item => item.categoria))];
    const $select = $('#filtro-categoria');
    
    const seleccionActual = $select.val();
    
    $select.empty();

    // Cargar categorías únicas en el filtro
    $select.append('<option value="">Todas las categorías</option>');
    
    categoriasUnicas.sort().forEach(cat => {
        $select.append(`<option value="${cat}">${cat}</option>`);
    });

    if(seleccionActual) {
        $select.val(seleccionActual);
    }

      data.forEach((med) => {
        
        let fechaVisual = 'Sin fecha';
        if (med.fecha_expiracion) {
            fechaVisual = new Date(med.fecha_expiracion).toISOString().split('T')[0];
        }

        const stockBadge = med.cantidad < 1 
            ? `<span class="badge bg-danger badge-stock"> ${med.cantidad}</span>`
            : `<span class="badge bg-success badge-stock">${med.cantidad}</span>`;

        // Agregar fila a la tabla
        $tbody.append(`
          <tr>
            <td>${med.id}</td>
            <td class="fw-bold text-primary">${med.nombre}</td>
            <td>${med.categoria}</td>
            <td>${stockBadge}</td>
            <td>${fechaVisual}</td>
            <td class="text-center">
              <button class="btn btn-outline-warning btn-sm btn-edit me-1" data-id="${med.id}" title="Editar">
                <i class="fas fa-pen"></i>
              </button>
              <button class="btn btn-outline-danger btn-sm btn-delete" data-id="${med.id}" title="Eliminar">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        `);
      });

      // Inicializar DataTable con opciones
      $('#miTabla').DataTable({
        language: { 
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        columnDefs: [
          { orderable: false, targets: 5 },
          { searchable: false, targets: [0, 2, 3, 4, 5] }
        ], 
        order: [[0, 'desc']], 
        pageLength: 5,
        lengthMenu: [5, 10, 20]
      });

      if(seleccionActual) {
        table.column(2).search(seleccionActual).draw();
    }

  }).fail(() => alert('Error al conectar con el servidor'));
  }

  // Función para resetear el formulario de medicamento
  function resetearForm() {
    $('#form-medicamento')[0].reset();
    $('#edit-id').val('');
    
    $('#form-titulo').html('<i class="fas fa-plus-circle"></i> Nuevo Medicamento').removeClass('text-warning').addClass('text-primary');
    $('#btn-submit').html('<i class="fas fa-save"></i> Guardar').removeClass('btn-warning').addClass('btn-primary');
    $('#btn-cancelar').addClass('d-none');
  }

  // Manejo del envío del formulario para crear o actualizar un medicamento
  $('#form-medicamento').on('submit', function(e) {
    e.preventDefault();
    
    const id = $('#edit-id').val();
    const esEdicion = id !== ""; 
    
    const datos = {
      nombre: $('#nombre').val(),
      categoria: $('#categoria').val(),
      cantidad: parseInt($('#cantidad').val()),
      fecha_expiracion: $('#fecha').val()
    };

    const url = esEdicion ? `${API_BASE}/${id}` : API_BASE;
    const metodo = esEdicion ? 'PUT' : 'POST';

    const $btn = $('#btn-submit');
    const textoOriginal = $btn.html();
    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Procesando...');

    // Realizar la solicitud AJAX
    $.ajax({
      url: url,
      method: metodo,
      contentType: 'application/json',
      data: JSON.stringify(datos),
      success: function() {
        alert(esEdicion ? 'Actualizado correctamente' : 'Guardado correctamente');
        resetearForm();
        cargarTabla();
      },
      error: function(xhr) {
        const msg = xhr.responseJSON ? xhr.responseJSON.message : 'Error desconocido';
        alert(`Error: ${msg}`);
      },
      complete: function() {
        $btn.prop('disabled', false).html(textoOriginal);
      }
    });
  });

  // Manejo del botón de editar
  $(document).on('click', '.btn-edit', function() {
    const id = $(this).data('id');
    
    $.get(`${API_BASE}/${id}`, (med) => {
      $('#edit-id').val(med.id);
      $('#nombre').val(med.nombre);
      $('#categoria').val(med.categoria);
      $('#cantidad').val(med.cantidad);
      
      if(med.fecha_expiracion) {
        const fechaFormatoInput = new Date(med.fecha_expiracion).toISOString().split('T')[0];
        $('#fecha').val(fechaFormatoInput);
      }

      $('#form-titulo').html('<i class="fas fa-pen"></i> Editar Medicamento').removeClass('text-primary').addClass('text-warning');
      $('#btn-submit').html('<i class="fas fa-check"></i> Actualizar').removeClass('btn-primary').addClass('btn-warning');
      $('#btn-cancelar').removeClass('d-none');
      
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    });
  });

  // Manejo del botón de eliminar
  $(document).on('click', '.btn-delete', function() {
    const id = $(this).data('id');
    if (confirm('¿Estás seguro de que deseas eliminar este medicamento?')) {
      $.ajax({
        url: `${API_BASE}/${id}`,
        method: 'DELETE',
        success: function() {
          cargarTabla();
          if($('#edit-id').val() == id) {
            resetearForm();
          }
        },
        error: function() {
            alert('No se pudo eliminar el registro.');
        }
      });
    }
  });

  $('#btn-cancelar').click(resetearForm);
  $('#btn-refresh').click(cargarTabla);
  $('#filtro-categoria').on('change', function() {
    const valor = $(this).val();
    const table = $('#miTabla').DataTable();
    
    table.column(2).search(valor).draw();
});

  cargarTabla();
});