import { Card, CardBody, CardHeader, IconButton, WidgetTitle } from "./styles";
import { Dropdown } from "react-bootstrap";
import { TbDotsVertical } from 'react-icons/tb';
import Chart from "../Chart";

const Widget = ({ editWidget, removeWidget, data }) => {
    return (
        <Card className="mb-5">
            <CardHeader className="row">
                <div className="col-10">
                    <WidgetTitle>{data.title}</WidgetTitle>
                </div>

                <Dropdown className="col-1 ms-auto me-3 align-self-center">
                    <IconButton className="py-0" id="dropdown-basic">
                        <TbDotsVertical size='1.5rem' />
                    </IconButton>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => editWidget(data)}>Editar</Dropdown.Item>
                        <Dropdown.Item onClick={() => removeWidget(data.id)}>Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </CardHeader>

            <CardBody>
                <Chart chartData={data} />
            </CardBody>
        </Card>
    )
}

export default Widget;