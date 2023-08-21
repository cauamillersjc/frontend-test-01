import { ButtonsColumn, Card, CardBody, CardHeader, ChartContainer, IconButton, ChartFooter, DataContainer } from "./styles";
import { Form, Button, Row, Col } from "react-bootstrap";
import { TbChartLine, TbChartArea, TbChartBar, TbChartPie, TbChartDots } from 'react-icons/tb';
import { MdClose } from 'react-icons/md';
import { useState, useMemo, useEffect, useRef } from "react";
import Chart from "../Chart";
import { useFormik } from "formik";

const NewWidget = ({ chartData, setChartData, setComplete, handleCancelNewWidget }) => {
    const [series, setSeries] = useState(chartData.series);
    const cardRef = useRef(null);

    useEffect(() => {
        scrollToElement();
    }, []);

    const scrollToElement = () => {
        if (cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    };

    useEffect(() => {
        if (chartData.title !== '' && chartData.type !== '') {
            setComplete(true);
        }
        else {
            setComplete(false);
        }
    }, [chartData])

    // Função responsável por capturar a troca de tipo de gráfico
    const handleSwitchChartType = (type) => {
        if (chartData.type === type) {
            setChartData({ ...chartData, type: "" });
        }
        else {
            setChartData({ ...chartData, type: type });
        }
    }

    // Evento de blur para atualizar os dados somente ao sair do elemento
    const handleBlurChartTitle = () => {
        if (chartData.title !== formik.values.chartTitle)
            setChartData({ ...chartData, title: formik.values.chartTitle });
    }

    // Evento de blur para atualizar os dados somente ao sair do elemento
    const handleBlurXAxisTitle = () => {
        if (chartData.xAxisTitle !== formik.values.xAxisTitle)
            setChartData({ ...chartData, xAxisTitle: formik.values.xAxisTitle });
    }

    // Evento de blur para atualizar os dados somente ao sair do elemento
    const handleBlurYAxisTitle = () => {
        if (chartData.yAxisTitle !== formik.values.yAxisTitle)
            setChartData({ ...chartData, yAxisTitle: formik.values.yAxisTitle });
    }

    // No evento de blur (desfocar do elemento de input) os dados são filtrados e passados para o state que é enviado ao componente de gráfico
    const handleSeriesBlur = () => {
        console.log(series);

        const updatedSeries = series.map(serie => ({
            ...serie,
            data: Array.isArray(serie.data) ? serie.data : serie.data.split(",").map(Number)
        }));

        setChartData({ ...chartData, series: updatedSeries });
    }

    // Função responsável por filtrar os dados inseridos e adiciona-los no state
    const handleSeriesChange = (index, field, value) => {
        if (field === "data") {
            // Filtro no campo de dados para permitir somente numeros e virgulas e não permitir duas virgulas seguidas
            value = value.replace(/[^0-9,]/g, '').replace(/,{2,}/g, ',');
        }

        const updatedSeries = [...series];
        updatedSeries[index] = { ...updatedSeries[index], [field]: value };
        setSeries(updatedSeries);
    }

    // Função que adiciona uma nova serie de dados
    const addEmptySeries = () => {
        const newSeries = { name: "", data: "" };
        setSeries([...series, newSeries]);
    }

    const formik = useFormik({
        initialValues: {
            chartTitle: chartData.title,
            yAxisTitle: chartData.yAxisTitle,
            xAxisTitle: chartData.xAxisTitle,
        },
    })

    const chartComponent = useMemo(() => {
        if (chartData.type !== '') {
            return <Chart chartData={chartData} />;
        }
        return null;
    }, [chartData]);

    return (
        <Card className="mb-5" ref={cardRef}>
            <CardHeader>
                <Col xs={12} className="text-end align-self-center">
                    <IconButton
                        className="p-0"
                        onClick={() => handleCancelNewWidget()}
                        title="Fechar"
                    >
                        <MdClose size='2rem' />
                    </IconButton>
                </Col>

                <Col md={5} xs={12} className="mb-1">
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        name="chartTitle"
                        value={formik.values.chartTitle}
                        onChange={formik.handleChange}
                        onBlur={handleBlurChartTitle}
                    />
                </Col>

                <Col md={3} xs={6}>
                    <Form.Control
                        type="text"
                        placeholder="Eixo X"
                        name="xAxisTitle"
                        value={formik.values.xAxisTitle}
                        onChange={formik.handleChange}
                        onBlur={handleBlurXAxisTitle}
                    />
                </Col>

                <Col md={3} xs={6}>
                    <Form.Control
                        type="text"
                        placeholder="Eixo Y"
                        name="yAxisTitle"
                        value={formik.values.yAxisTitle}
                        onChange={formik.handleChange}
                        onBlur={handleBlurYAxisTitle}
                    />
                </Col>
            </CardHeader>

            <CardBody>
                <ButtonsColumn>
                    <div>
                        <IconButton
                            title="Gráfico de Linha"
                            onClick={() => handleSwitchChartType('line')}
                            className={`${chartData.type === 'line' && 'active'}`}
                        >
                            <TbChartLine />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton
                            title="Gráfico de Área"
                            onClick={() => handleSwitchChartType('area')}
                            className={`${chartData.type === 'area' && 'active'}`}
                        >
                            <TbChartArea />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton
                            title="Gráfico de Barra"
                            onClick={() => handleSwitchChartType('bar')}
                            className={`${chartData.type === 'bar' && 'active'}`}
                        >
                            <TbChartBar style={{ transform: 'rotate(90deg) scaleX(-1)' }} />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton
                            title="Gráfico de Torta"
                            onClick={() => handleSwitchChartType('pie')}
                            className={`${chartData.type === 'pie' && 'active'}`}
                        >
                            <TbChartPie />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton
                            title="Gráfico de Ponto"
                            onClick={() => handleSwitchChartType('scatter')}
                            className={`${chartData.type === 'scatter' && 'active'}`}
                        >
                            <TbChartDots />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton
                            title="Gráfico de Coluna"
                            onClick={() => handleSwitchChartType('column')}
                            className={`${chartData.type === 'column' && 'active'}`}
                        >
                            <TbChartBar />
                        </IconButton>
                    </div>
                </ButtonsColumn>

                <ChartContainer>
                    <div>
                        {chartComponent}
                    </div>
                </ChartContainer>
            </CardBody>

            <ChartFooter>
                <DataContainer>
                    {series.map((serie, index) => (
                        <Row className="mb-2" key={index}>
                            <Col md={4} xs={12}>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome da Série"
                                    value={serie.name}
                                    onChange={(e) => handleSeriesChange(index, "name", e.target.value)}
                                    onBlur={handleSeriesBlur}
                                />
                            </Col>

                            <Col md={8} xs={12}>
                                <Form.Control
                                    type="text"
                                    placeholder="Dados da Série (separados por vírgulas)"
                                    value={serie.data}
                                    pattern="^\d+(,\s*\d+)*$"
                                    onChange={(e) => handleSeriesChange(index, "data", e.target.value)}
                                    onBlur={handleSeriesBlur}
                                />
                            </Col>
                        </Row>
                    ))}
                </DataContainer>

                <div className="d-flex my-2 justify-content-center">
                    <Button onClick={addEmptySeries}>
                        Adicionar Série
                    </Button>
                </div>
            </ChartFooter>
        </Card>
    )
}

export default NewWidget;