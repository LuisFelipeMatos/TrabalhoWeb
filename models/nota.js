module.exports = function(sequelize, DataTypes){
    const Nota = sequelize.define(
   'Nota', 
   {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'id'
        }
      },
      titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      criadoEm: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      atualizadoEm: {
        type: DataTypes.DATE,
        allowNull: true
      },
      

   },
   {
      tableName: 'nota',
      timestamps: false
    }   
    );
    
    Nota.associate = (models) =>{
        this.belogsTo(models.Usuario, {
         foreignKey: 'usuarioId',   
        })
    };

    
    
    return Nota;
    };
   
