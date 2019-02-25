import React from 'react';

import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Api from '../../utils/Api';

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});

@withRouter
@inject('appStore')
@observer
class DragDropServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.addData = this.addData.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    let updateSortIndex = result.destination.index;
    let updateDargId = result.draggableId;
    Api.put('dragdropData/' + updateDargId, {
      sortIndex: updateSortIndex
    }).then(result => {
      this.refresh();
    });
  }

  refresh() {
    Api.get('dragdropData').then(result => {
      this.setState({ data: result.data });
    });
  }

  addData() {
    Api.post('dragdropData', {
      name: 'yamdeng10'
    }).then(result => {
      this.refresh();
    });
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('DragDropServer 테스트');
    this.refresh();
  }

  render() {
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.data.map(item => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={item.sortIndex}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.name} {'(' + item.sortIndex + ')'}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          <button type="button" class="btn btn-primary" onClick={this.addData}>
            추가
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default DragDropServer;
