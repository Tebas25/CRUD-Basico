import { useEffect, useState } from "react";
import Layout from "../../components/layout.component";
import { useAllSeason } from "../../hooks/admin/seasons/useAllSeasons";
import "../../styles/seasons.css";
import { useCreateSeason } from "../../hooks/admin/seasons/useCreateSeason";
import Modal from "../../components/modal";
import { SeasonForm } from "./NewSeasonPage";

const AdministrationPage = () => {
  const {
    season,
    loadingSeasion,
    selectedSeasons,
    selectAll,
    onSelectionChange,
    onSelectionAllChange,
    refetchSeasons
  } = useAllSeason();

  const { hookForm, handleCreateSeason, loadingCreateSeason } = useCreateSeason();

  useEffect(() => {
    refetchSeasons();
  }, []);

  const formatDateString = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const isSeasonActive = (startDate: string, endDate: string) => {
    const today = new Date().toISOString().split('T')[0]; 
    return startDate <= today && endDate >= today;
  };
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateSeasonModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    hookForm.reset();
  }

  const handleCreateSeasonSubmit = async () => {
    await handleCreateSeason();
    closeCreateModal();
    refetchSeasons();
  }


  return (
    <Layout title="Página de administración">
      <div className="admin-page">
        <header className="admin-header">
          <h1>Administración de Temporadas</h1>
          <p>Gestiona las temporadas y sus multiplicadores</p>
        </header>

        <div className="controls-panel">
          <div className="controls-left">
            <label className="select-all-label">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => onSelectionAllChange(e.target.checked)}
              />
              <span>Seleccionar todo</span>
            </label>
            {selectedSeasons.length > 0 && (
              <span className="selection-count">
                {selectedSeasons.length} temporada(s) seleccionada(s)
              </span>
            )}
          </div>

          <div className="controls-right">
            <button onClick={openCreateSeasonModal} className="new-season-btn">
              Nueva Temporada
            </button>
          </div>
        </div>

        <div className="seasons-table-container">
          {loadingSeasion ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <span>Cargando temporadas...</span>
            </div>
          ) : season.length === 0 ? (
            <div className="empty-state">
              No hay temporadas registradas
            </div>
          ) : (
            <table className="seasons-table">
              <thead>
                <tr>
                  <th>Seleccionar</th>
                  <th>Nombre</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Multiplicador</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {season.map((seasonItem, index) => (
                  <tr 
                    key={index} 
                    className={selectedSeasons.includes(seasonItem) ? 'selected-row' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedSeasons.includes(seasonItem)}
                        onChange={(e) => {
                          const newSelection = e.target.checked
                            ? [...selectedSeasons, seasonItem]
                            : selectedSeasons.filter(item => item !== seasonItem);
                          onSelectionChange(newSelection);
                        }}
                      />
                    </td>
                    <td>{seasonItem.Nombre}</td>
                    <td>{formatDateString(seasonItem.Fecha_inicio)}</td>
                    <td>{formatDateString(seasonItem.Fecha_fin)}</td>
                    <td>
                      <span className={`multiplier-badge ${
                        seasonItem.Multiplicador > 1 ? 'high' : 
                        seasonItem.Multiplicador < 1 ? 'low' : 'normal'
                      }`}>
                        {seasonItem.Multiplicador}x
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${
                        isSeasonActive(seasonItem.Fecha_inicio, seasonItem.Fecha_fin) 
                          ? 'active' 
                          : 'inactive'
                      }`}>
                        {isSeasonActive(seasonItem.Fecha_inicio, seasonItem.Fecha_fin) 
                          ? 'Activa' 
                          : 'Inactiva'
                        }
                      </span>
                    </td>
                    <td>
                      <button className="edit-btn">Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="stats-container">
          <div className="stat-card total">
            <h3>Total de Temporadas</h3>
            <p>{season.length}</p>
          </div>
          <div className="stat-card active">
            <h3>Temporadas Activas</h3>
            <p>
              {season.filter(s => 
                isSeasonActive(s.Fecha_inicio, s.Fecha_fin)
              ).length}
            </p>
          </div>
          <div className="stat-card selected">
            <h3>Seleccionadas</h3>
            <p>{selectedSeasons.length}</p>
          </div>
        </div>
      </div>

      <Modal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Crear Nueva Temporada">
            <SeasonForm
                hookForm={hookForm}
                onSubmit={handleCreateSeasonSubmit}
                loading={loadingCreateSeason}
                onCancel={closeCreateModal}
            />
      </Modal>
    </Layout>
  );
};

export default AdministrationPage;