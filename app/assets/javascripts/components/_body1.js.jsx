var Body1 = React.createClass({
    getInitialState() {
        return { items: [],activeItem:undefined}
    },


    componentDidMount() {
        $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
    },



    handleSubmit(item) {
        var newState = this.state.items.concat(item);
        this.setState({ items: newState })
    },


    handleDelete(id) {
		//debugger;
        $.ajax({
            url: `/api/v1/items/${id}`,
            type: 'DELETE',
            success:() => {
               this.removeItemClient(id);
            }
        });
    },

    removeItemClient(id) {
        var newItems = this.state.items.filter((item) => {
            return item.id != id;
        });

        this.setState({ items: newItems });
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
                url: `/api/v1/items/${item.id}`,
                type: 'PUT',
                data: { item: {id:item.id, name:item.name, description:description, chat_id:item.chat_id, bot_id:item.bot_id  }},
                success: () => {
                    this.updateItems(item,description);
					this.sendMessageToTelegramBot(item,description);

                }
            }
        )},

    updateItems(item,description) {
		
		/*var items = this.state.items;
		var found = items.find(function(element) { return element.id==item.id;});
		found.description =  found.description+'\n'+description;
        this.setState({items: items });*/
         var items = this.state.items.filter((i) => { return i.id != item.id });
//        items.push({id:item.id, name:item.name, description:description });
        items.push({id:item.id, name:item.name, description:this.state.activeItem.description+"\n"+description, chat_id:item.chat_id, bot_id:item.bot_id });
        this.setState({items: items }, function(){debugger;console.log(	this.state.items)});
		},
	sendMessageToTelegramBot(item,description){
		//debugger;
        $.ajax({
                url: `https://api.telegram.org/bot`+item.bot_id+`/sendMessage?chat_id=`+item.chat_id+`&text=`+description,
                type: 'GET',
                success: () => {/*debugger;console.log(	this.state.items)*/}
            }
        )},
	
    handleClick(id) {
		var found = this.state.items.find(function(element) { return element.id==id;});
		//debugger;
        this.setState({items: this.state.items, activeItem:found }, function(){console.log(	this.state.activeItem)}); 
    },

    render() {
             var items = this.state.items.map((item) => {
                return (
                    <div key={item.id}>
                        <Item item={item}
							  handleClick={this.handleClick.bind(this, item.id)}
                              handleDelete={this.handleDelete.bind(this, item.id)}
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
					<ActiveItem activeItem={this.state.activeItem} handleSubmit={this.handleSubmit} handleUpdate={this.handleUpdate}/></td></tr>
					<tr><td>
					Новый чат:</td></tr>
					<tr><td>
					<NewItem handleSubmit={this.handleSubmit}/></td></tr>
					</tbody></table>
				</td>
				</tr>
				</tbody>
				</table>
            </div>
        )
    }
});