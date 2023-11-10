import styled from "styled-components";
import {v4 as uuid} from 'uuid';
import {useState} from 'react'
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";

const App = () =>{

  const input =[
    {
      id: uuid(),
      task:"Cook Food"
    },
    {
      id: uuid(),
      task:"Fetch Water"
    },
    {
      id: uuid(),
      task:"Arrange House"
    },
    {
      id: uuid(),
      task:"Bath"
    }
  ];

  const main = {
    todo: {
      id: "todo",
      data: input,
    },

    progress: {
      id: "progress",
      data: [],
    },

    done: {
      id: "done",
      data: [],
    },
  };
  const [state, setState]:any = useState(main)
   console.log(state);
   
  const onDrag = (result: any) =>{
    console.log(result)
    const {source, destination} = result;
    // if(!destination) return;

    if(destination.droppableId !== source.droppableId) {
      console.log('first');
      
      let soData = state[source.droppableId]
      let deData = state[destination.droppableid]

      let soItems = [...soData.data];
      let deItems = [...deData.data];



      let [remove] = soItems.splice(source.index, 1)
      deItems.splice(destination.index, 0 ,remove)

      setState({
        ...state,
        [source.droppableId]: {
          ...soData,
          data: soItems
        },
        [destination.droppableId]:{
          ...deData,
          data: deItems,
        },
      });
    } else {
       let data = state[source.droppableId];
       let items = [...data.data]
       console.log(items)
       let [remove] = items.splice(source.index, 1);
       items.splice(destination.index, 0, remove);

       setState({
        ...state,
        [source.droppableId]:{ 
          ...data,
          data: items,
        }
      })
      // console.log(items)
    }
    
  }
  return(
    <div>
      <Container>
        <Main>
          <DragDropContext onDragEnd={onDrag}>
             <Arrange>
               {Object.entries(state).map((prop:any)=>(
                  <Column key={prop[0]}>
                  <TopTit>{prop[0]}</TopTit>
                  <div>
                    <Droppable droppableId={prop[0]}>
                      {(provided:DroppableProvided, snapshot:DroppableStateSnapshot)=>( 
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{backgroundColor: snapshot.isDraggingOver
                           ?"#ffff"
                           :"#b7f87fba",
                           minHeight:"400px",
                           display:"flex",
                          //  justifyContent:"space-between",
                           alignItems:"center",
                           flexDirection:"column"
                          }}
                        >
                          <div>
                            {prop[1].data.map((propss: any, i:number)=>(
                              <Draggable
                                draggableId={propss.id}
                                key={propss.id}
                                index={i}
                              >
                                {(provided:DraggableProvided, snapshot:DraggableStateSnapshot)=>(
                                  <Card
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}

                                    // style={{backgroundColor: snapshot.isDragging
                                    //  ?"#22eecfb1"
                                    //  :"#d3ee22b0"
                                    // }}


                                  >{propss.task}</Card>
                                )}
                              </Draggable>
                            ))}
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                  </Column>
               ))}
             </Arrange> 
          </DragDropContext>
        </Main>

      </Container>
    </div>
  )
}

export default App;
const Card = styled.div`
  width: 200px;
  height: 80px;
  border: 1px solid silver;
  background-color: wheat;
  color: black;
  margin: 10px;
`
const TopTit = styled.div`
  height: 50px;
  border-bottom:1px solid silver ;
`
const Column = styled.div`
  width: 250px;
  border: 1px solid silver;
  min-height: 70px;
  margin: 5px;
  border-radius: 7px;
`
const Arrange = styled.div`
  display: flex;
 
`
const Main = styled.div`
  height: 500px;
  width: 700px;
  border: 1px solid silver;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`