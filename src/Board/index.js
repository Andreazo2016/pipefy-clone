import React, { useState } from 'react';
import BoardContext from './context';
import { Container } from './styles';

import produce from 'immer';


import { loadLists } from './../services/api';

import List from './../List';


const data = loadLists();


export default function Board() {

    const [lists, setLists] = useState(data);

    function move(fromList,toList,from, to) {
        setLists(produce(lists, draft => {
            /**Pegando o card pela a posição da lista pelo o index da lista */
            const  dragged  =  draft[fromList].cards[from];
        
            /**removendo o card da posição da lista */
            draft[fromList].cards.splice(from,1);

            /**adicionando o card na lista certa e posição*/
            draft[toList].cards.splice(to,0,dragged);
        }));

    }
    return (
        <BoardContext.Provider value={{ lists, move }}>
            <Container>
                {lists.map((list,index) => <List key={list.title} index={index} data={list} />)}
            </Container>
        </BoardContext.Provider>

    );
} 