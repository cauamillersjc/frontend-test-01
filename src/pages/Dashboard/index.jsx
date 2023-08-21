import { Navbar, Form, FormControl, Image, Button } from 'react-bootstrap';
import DelfosLogo from '../../assets/delfos_logo.png';
import { TopNavbar, Container, FixedButton } from './styles';
import { useEffect, useRef, useState } from 'react';
import Widget from '../../components/Widget';
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import NewWidget from '../../components/NewWidget';
import { PiCheckFatFill } from 'react-icons/pi';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { deleteWidget, saveWidget } from '../../redux/actions';
import { selectWidgetByTitle } from '../../redux/selectors';

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [creating, setCreating] = useState(false);
    const [complete, setComplete] = useState(false);
    const [isEditing, setIsEditing] = useState(0);
    const [newChartData, setNewChartData] = useState({
        id: 0,
        title: '',
        type: '',
        yAxisTitle: '',
        xAxisTitle: '',
        series: [{ name: "", data: [] }],
    })

    const dispatch = useDispatch();
    const filteredWidgets = useSelector(state => selectWidgetByTitle(state, search));

    const handleSearch = (value) => {
        setSearch(value);
    }

    const handleNewWidget = () => {
        setNewChartData({
            id: 0,
            title: '',
            type: '',
            yAxisTitle: '',
            xAxisTitle: '',
            series: [{ name: "", data: "" }],
        });
        setCreating(true);
    }

    const handleCancelNewWidget = () => {
        setCreating(false);
        setIsEditing(0);
    }

    // Função responsável em salvar o widget
    const handleSaveNewWidget = () => {
        Swal.fire({
            title: 'Salvar Widget?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Salvo!',
                    'Seu Widget foi salvo com sucesso.',
                    'success'
                )
                setCreating(false);
                setIsEditing(0);
                dispatch(saveWidget(newChartData));
            }
        })
    }

    // Função responsável pela remoção de um widget
    const removeWidget = (id) => {
        Swal.fire({
            title: 'Deseja excluir o Widget?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Excluído!',
                    'Seu Widget foi excluído com sucesso.',
                    'success'
                )
                dispatch(deleteWidget(id));
            }
        })
    }

    // Função responsável por inicializar um componente de criação de widget com os dados de um existente para a edição
    const editWidget = (widget) => {
        setNewChartData(widget);
        setIsEditing(widget.id);
        setCreating(true);
    }

    return (
        <>
            <TopNavbar
                className='px-3 py-0'
                sticky='top'
            >
                <Navbar.Brand>
                    <Image
                        src={DelfosLogo}
                        height='90px'
                    />
                </Navbar.Brand>
                <Form
                    className='ms-auto me-4'
                    inline
                >
                    <FormControl
                        type="text"
                        placeholder="Buscar Widget"
                        className="mr-sm-2"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Form>
            </TopNavbar>

            <Container>
                {creating && isEditing === 0 &&
                    <NewWidget
                        chartData={newChartData}
                        setChartData={setNewChartData}
                        setComplete={setComplete}
                        handleCancelNewWidget={handleCancelNewWidget}
                    />
                }

                {isEditing !== 0 &&
                    <NewWidget
                        chartData={newChartData}
                        setChartData={setNewChartData}
                        setComplete={setComplete}
                        handleCancelNewWidget={handleCancelNewWidget}
                    />
                }

                {filteredWidgets.length ? (
                    filteredWidgets.map((widget) => (
                        widget.id !== isEditing &&
                        <Widget
                            removeWidget={removeWidget}
                            editWidget={editWidget}
                            key={widget.id}
                            data={widget}
                            isCreated
                        />)
                    )
                ) : (
                    search === '' ?(
                        <p>Nenhum Widget cadastrado.</p>
                    ) : (
                        <p>Nenhum Widget foi encontrado.</p>
                    )
                )}

                {creating ? (
                    <FixedButton
                        className='rounded-circle'
                        onClick={() => handleSaveNewWidget()}
                        title='Salvar Widget'
                        disabled={!complete}
                    >
                        <PiCheckFatFill />
                    </FixedButton>
                ) : (
                    <FixedButton
                        className='rounded-circle'
                        onClick={() => handleNewWidget()}
                        title='Adicionar Widget'
                    >
                        <FaPlus />
                    </FixedButton>
                )}

            </Container>
        </>
    )
}

export default Dashboard;