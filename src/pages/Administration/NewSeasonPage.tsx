import type { UseFormReturn } from "react-hook-form";
import type { Season } from "../../hooks/admin/admin";

interface SeasonFormProps {
    hookForm: UseFormReturn<Season>;
    onSubmit: () => void;
    loading: boolean;
    onCancel: () => void;
}

export const SeasonForm = ({ hookForm, onSubmit, loading, onCancel }: SeasonFormProps) => {
    const { register, handleSubmit, formState: { errors } } = hookForm;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="seasonForm">
            <div className="form-grid">
                <div className="form-field">
                    <label>Nombre*</label>
                    <input 
                        type="text"
                        {...register('nombre', {
                            required: 'El nombre es requerido',
                            minLength: {
                                value: 3,
                                message: 'Mínimo 3 caracteres'
                            }
                        })}
                        placeholder="Ingrese el nombre de la temporada"
                    />
                    {errors.nombre && <span className="error">{errors.nombre.message}</span>}
                </div>

                <div className="form-field">
                    <label>Fecha Inicio*</label>
                    <input 
                        type="text"
                        {...register('fecha_inicio', {
                            required: 'La fecha inicial es requerida',
                            minLength: {
                                value: 3,
                                message: 'Mínimo 3 caracteres'
                            }
                        })}
                        placeholder="Ingrese la fecha de inicio"
                    />
                    {errors.nombre && <span className="error">{errors.nombre.message}</span>}
                </div>

                <div className="form-field">
                    <label>Fecha Fin*</label>
                    <input 
                        type="text"
                        {...register('fecha_final', {
                            required: 'La fecha final es requerida',
                            minLength: {
                                value: 3,
                                message: 'Mínimo 3 caracteres'
                            }
                        })}
                        placeholder="Ingrese la fecha de fin"
                    />
                    {errors.nombre && <span className="error">{errors.nombre.message}</span>}
                </div>

                <div className="form-field">
                    <label>Multiplicador*</label>
                    <input 
                        type="text"
                        {...register('multiplicador', {
                            required: 'El multiplicador es requerido',
                            minLength: {
                                value: 1,
                                message: 'Mínimo 1 caracter'
                            }
                        })}
                        placeholder="Ingrese el multiplicador de temporada"
                    />
                    {errors.nombre && <span className="error">{errors.nombre.message}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} disabled={loading}>
                        Cancelar
                    </button>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar Temporada'}
                    </button>
                </div>
            </div>
        </form>
    )
}