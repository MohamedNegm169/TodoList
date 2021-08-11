import React, { PureComponent } from "react";
import List from "./List";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../actions";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

// TODO: Fix performance issue

class Board extends PureComponent {
  componentDidMount() {
    this.props.dispatch(setActiveBoard("board-0"));
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists, cards, boards } = this.props;
    const board = boards["board-0"];
    const listOrder = board.lists;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((listID, index) => {
                const list = lists[listID];
                if (list) {
                  const listCards = list.cards.map((cardID) => cards[cardID]);

                  return (
                    <List
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={listCards}
                      index={index}
                    />
                  );
                }
              })}
              {provided.placeholder}
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => {
  const lists = state.lists;
  const cards = state.cards;
  const boards = state.boards;
  return {
    lists,
    cards,
    boards,
  };
};
export default connect(mapStateToProps)(Board);
