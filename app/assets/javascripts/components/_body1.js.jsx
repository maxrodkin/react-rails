var Body1 = React.createClass({
    getInitialState() {
        return { items: [],activeItem:undefined,activeItemIndex:undefined}
    },


    componentDidMount() {
        $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
    },



    handleSubmit(item) {
        var newState = this.state.items.concat(item);
        this.setState({ items: newState })
    },


    handleDelete(id,index) {
		//debugger;
        $.ajax({
            url: `/api/v1/items/${id}`,
            type: 'DELETE',
            success:() => {
               this.removeItemClient(id,index);
            }
        });
    },

    removeItemClient(id,index) {
        var newItems = this.state.items.filter((item) => {
            return item.id != id;
        });

        this.setState({ items: newItems ,activeItem:this.state.items[index-1], activeItemIndex:index-1});
    },

/*    updateItemClient(id,description) {
        //var newItems = this.state.items.filter((item) => {
        //    return item.id != id;
		//});

        //this.setState({ items: newItems });
		console.log(id,'=',description);
    },
*/

    handleUpdate(item,description) {
		//debugger;
        $.ajax({
                url: `/api/v2/items/${item.id}`,
                type: 'PUT',
                data: { item: {id:item.id, name:item.name, description:description, chat_id:item.chat_id, bot_id:item.bot_id  }},
                success: () => {
                    this.updateItems(item,description);
					this.sendMessageToTelegramBot(item,description);

                }
            }
        )},

    updateItems(item,description) {
         var items = this.state.items.filter((i) => { return i.id != item.id });//исключаем текущий элемент из state.items , чтобы добвить его обновленный в стейт
        items.push({id:item.id, name:item.name, description:this.state.activeItem.description+"\n"+description, chat_id:item.chat_id, bot_id:item.bot_id });
        this.setState({items: items,activeItem:item, activeItemIndex:items.length-1}, function(){/*debugger;*/console.log(	"after set state: "+JSON.stringify(this.state))});
		},
	sendMessageToTelegramBot(item,description){
		//debugger;
        $.ajax({
                url: `https://api.telegram.org/bot`+item.bot_id+`/sendMessage?chat_id=`+item.chat_id+`&text=`+description,
                type: 'GET',
                success: () => {/*debugger;console.log(	this.state.items)*/}
            }
        )},
	
    handleClick(id,index) {
		var found = this.state.items.find(function(element) { return element.id==id;});
		//debugger;
        this.setState({items: this.state.items, activeItem:found , activeItemIndex:index }, function(){console.log(	"after click: "+JSON.stringify(this.state))}); 
    },

    render() {
             var items = this.state.items.map((item,index) => {
                return (
                    <div key={item.id}>
                        <Item item={item}
							  handleClick={this.handleClick.bind(this, item.id,index)}
                              handleDelete={this.handleDelete.bind(this, item.id,index)}
                              handleUpdate={this.onUpdate}/>
                    </div>
                )
            });
//console.log(	items);		
			return (
            <div>
				<table><thead><tr><th>Контакты</th><th>Чат</th></tr></thead>
				<tbody><tr><td>

                {items}

				</td>
				<td>
					<table><tbody>
					<tr><td>
					<ActiveItem items={this.state.items} activeItem={this.state.activeItem} activeItemIndex={this.state.activeItemIndex} handleSubmit={this.handleSubmit} handleUpdate={this.handleUpdate}/></td></tr>
					{/*<tr><td>
					Новый чат:</td></tr>
					<tr><td>
					<NewItem handleSubmit={this.handleSubmit}/></td></tr>*/}
					</tbody></table>
				</td>
				</tr>
				</tbody>
				</table>
            </div>
        )
    }
});