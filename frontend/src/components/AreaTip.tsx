import { FC } from "react";

interface Props {
  area: string;
}

export const AreaTip: FC<Props> = ({ area }) => {
  switch (area) {
    case "A":
      return (
        <div>
          <strong>Area CÁLCULO:</strong> Matemáticas, Estadística y Economía.
          <br />
          <strong>Intereses en Cómputo, Cuentas y Cálculo:</strong> Altos
          puntajes indican una preferencia por trabajar con números y máquinas
          calculadoras. <br />
          <strong>Intereses en la Técnica, Electrónica e Ingeniería:</strong>
          Indica un fuerte interés en la ciencia y tecnología aplicada, lo que
          implica la aplicación práctica de la teoría en áreas especializadas
          como la investigación, el diseño y el desarrollo. <br />
          <strong>Contexto en Tabasco:</strong> Es un área con baja tasa de
          profesionales pero alta demanda en el sector financiero y de
          planeación de proyectos industriales. <br />
          <strong>Dato de Realidad:</strong> Menos del 0.4% de la población
          ocupada en el estado percibe sueldos de alta gama (más de 5 salarios
          mínimos); entrar en este grupo requiere especialización técnica en
          análisis de riesgos o finanzas. <br />
          <strong>Hallazgo 2026:</strong> Alta demanda de Analistas de Datos y
          Financieros en las nuevas plantas industriales de Cunduacán y Centro,
          con sueldos que pueden alcanzar los $35,000 MXN.
        </div>
      );
    case "B":
      return (
        <div>
          <strong>Area CIENTÍFICO FÍSICO:</strong> Ingenierías, Petróleo y
          Química. <br />
          <strong>Intereses Científicos:</strong> Alto interés hacia la
          investigación y trabajos de laboratorio, así como actividad en el
          estudio de fenómenos atmosféricos, astronómicos y geográficos. Se
          enfoca en los aspectos teóricos de la física y las matemáticas, así
          como en los procesos de sistematización de datos. <br />
          <strong>Contexto en Tabasco:</strong> El corazón económico del estado.
          El sector de minería petrolera representa más del 60% del PIB estatal.{" "}
          <br />
          <strong>Dato de Realidad:</strong> Tabasco es el primer lugar nacional
          en producción de petróleo crudo (aporta el 50% del total nacional). El
          95% de las exportaciones del estado pertenecen a este sector. <br />
          <strong>Hallazgo 2026:</strong> Con la Refinería Olmeca operando, la
          demanda de Ingenieros Químicos, Petroleros y Geofísicos es la más
          estable y de mayor remuneración en la región.
        </div>
      );
    case "C":
      return (
        <div>
          <strong>Area CIENTÍFICO BIOLÓGICO:</strong> Medicina, Enfermería y
          Agronomía. <br />
          <strong>Intereses para el trabajo al Aire Libre:</strong> Se refiere a
          trabajos que tengan que ver con la naturaleza, su desarrollo y
          preservación. Quienes se dedican a este campo realizan trabajos
          técnicos y científicos de campo para mejorar y proteger las
          condiciones de todas las formas de vida sobre nuestro planeta. <br />
          <strong>Contexto en Tabasco:</strong> Sector vital pero con retos de
          saturación en el sistema público. La agroindustria está retomando
          fuerza en la zona de la Chontalpa. <br />
          <strong>Dato de Realidad:</strong> El sueldo promedio para médicos en
          el sector privado de Villahermosa ronda los $16,000 MXN, mientras que
          en la agroindustria (palma de aceite y cacao) hay un impulso renovado.
          <br />
          <strong>Hallazgo 2026:</strong> La búsqueda de especialistas en salud
          mental se ha duplicado en las empresas locales para cumplir con
          normativas de bienestar laboral.
        </div>
      );
    case "D":
      return (
        <div>
          <strong>Area MECÁNICO:</strong> Ing. Mecánica, Civil, Eléctrica y
          Sistemas. <br />
          <strong>Intereses Mecánicos:</strong> Demuestra una fuerte atracción
          por trabajos relacionados con la mecánica y la reparación de equipos.
          <br />
          <strong>Contexto en Tabasco:</strong> Experimenta un "boom" gracias a
          la infraestructura y la vivienda. Tabasco ha logrado el 2do lugar
          nacional en crecimiento de empleo formal ante el IMSS. <br />
          <strong>Dato de Realidad:</strong> La actividad industrial en el
          estado ha registrado crecimientos explosivos de hasta el 17.4% en
          periodos recientes. <br />
          <strong>Hallazgo 2026:</strong> Se estima la creación de 44,000
          empleos en construcción y mantenimiento debido al nuevo plan estatal
          de vivienda de 40,000 casas.
        </div>
      );
    case "E":
      return (
        <div>
          <strong>Area SERVICIO SOCIAL:</strong> Derecho, Psicología, Educación
          y Trabajo Social. <br />
          <strong>Intereses en Servicios Sociales:</strong> Indica una fuerte
          inclinación a la enseñanza, a la terapéutica y, en general, a las
          ocupaciones de ayuda a la comunidad. Demuestra predisposición para las
          relaciones interpersonales y la vocación de estar envuelto en la
          solución de problemas ocupacionales educacionales, correccionales, de
          salud y sociales. <br />
          <strong>Contexto en Tabasco:</strong> Sector con alta competencia y
          riesgo de informalidad laboral (67.2% de informalidad general en el
          estado). <br />
          <strong>Dato de Realidad:</strong> El sector servicios emplea al 64.4%
          de los tabasqueños, pero es el área donde más personas ganan apenas el
          salario mínimo. <br />
          <strong>Hallazgo 2026:</strong> La especialización y el dominio del
          inglés permiten a estos profesionales aspirar a sueldos un 40%
          superiores trabajando para empresas transnacionales con base en el
          estado.
        </div>
      );
    case "F":
      return (
        <div>
          <strong>Area LITERARIO:</strong> Letras, Periodismo, Idiomas y
          Filosofía. <br />
          <strong>Intereses Literarios:</strong> Muestra un interés en los
          trabajos relacionados con la cultura en general y la literatura. La
          actividad de este campo está primordialmente enfocada a la
          preservación, desarrollo y transmisión de la cultura general, con
          énfasis en la comunicación escrita. <br />
          <strong>Contexto en Tabasco:</strong> Área fuertemente ligada a la
          nueva era del Turismo Innovador y la comunicación corporativa. <br />
          <strong>Dato de Realidad:</strong> Tabasco ascendió al lugar 13
          nacional en competitividad turística; se buscan profesionales que
          sepan narrar y vender la identidad del estado. <br />
          <strong>Hallazgo 2026:</strong> Hay más de 14,200 unidades económicas
          turísticas y culturales que requieren gestores de contenido y
          traductores bilingües.
        </div>
      );
    case "G":
      return (
        <div>
          <strong>Area PERSUASIVO:</strong> Administración, Mercadotecnia,
          Turismo y Ventas. <br />
          <strong>Intereses en Negocios, Relaciones y Ventas:</strong>
          Inclinación hacia trabajos en los cuales se hace uso de la persuasión
          y el contacto humano. <br />
          <strong>Intereses en Dirección, Supervisión y Ejecutivos:</strong>
          Predilección por la organización, planeación, coordinación y dirección
          de funciones de una empresa, departamento o dependencia. <br />
          <strong>Intereses en Empleos de Oficina:</strong> Preferencia por los
          trabajos en empresas, en recolección, clasificación y ordenamiento de
          papeles, documentos y correspondencia, así como registros y relación
          de datos. <br />
          <strong>Contexto en Tabasco:</strong> Área con el mayor volumen de
          vacantes activas. El turismo genera hoy más de 74,700 empleos en el
          estado. <br />
          <strong>Dato de Realidad:</strong> El sector terciario creció en
          19,000 ocupados recientemente. Es un área de alta movilidad pero que
          requiere habilidades de negociación y liderazgo. <br />
          <strong>Hallazgo 2026:</strong> La consolidación de Tabasco como
          centro logístico (Tren Maya/Transístmico) demanda administradores
          capaces de gestionar cadenas de suministro complejas.
        </div>
      );
    case "H":
      return (
        <div>
          <strong>Area ARTÍSTICO:</strong> Diseño, Música y Artes Visuales.
          <br />
          <strong>Intereses Artísticos y Recreación:</strong> Indica un fuerte
          interés por los campos creativos del arte o el teatro, lo cual implica
          originalidad e imaginación. En el trabajo de este campo se utiliza la
          palabra, el movimiento corporal y materiales de pintura o escultura.
          <br />
          <strong>Contexto en Tabasco:</strong> Es un área que ha evolucionado
          hacia la economía naranja y el diseño digital. Aunque las vacantes
          tradicionales en empresas son pocas, el sector de servicios demanda
          cada vez más identidad visual. <br />
          <strong>Dato de Realidad:</strong> Existe una inversión extranjera en
          servicios creativos de aproximadamente 384 millones de dólares en el
          estado, lo que indica un mercado creciente en publicidad y diseño para
          empresas transnacionales. <br />
          <strong>Hallazgo 2026:</strong> Con el auge del Turismo Innovador, se
          buscan profesionales que desarrollen la imagen de marca de las
          "Experiencias Memorables" y productos locales que Tabasco exporta al
          mundo.
        </div>
      );
    case "I":
      return (
        <div>
          <strong>Area MUSICAL:</strong> Ejecución, Composición y Producción.
          <br />
          <strong>Intereses Musicales:</strong> Indica un fuerte interés por el
          campo creativo de la música, implicando originalidad e imaginación. En
          el trabajo de este campo se utiliza primordialmente la música y el
          sonido como medio de expresión. <br />
          <strong>Contexto en Tabasco:</strong> El estado tiene una tradición
          musical profunda, pero el mercado laboral formal es de nicho,
          concentrándose principalmente en la educación, eventos privados y la
          gestión pública de la cultura. <br />
          <strong>Dato de Realidad:</strong> Menos del 0.3% de los empleos
          formales registrados en la ENOE corresponden a la ejecución musical.
          Se recomienda el autoempleo y la gestión de proyectos independientes.{" "}
          <br />
          <strong>Hallazgo 2026:</strong> La red de industrias creativas en el
          sureste está impulsando la producción sonora para contenidos digitales
          y publicidad, lo que abre una nueva ventana de trabajo remoto para
          músicos que dominen herramientas tecnológicas.
        </div>
      );

    default:
      return null;
  }
};
