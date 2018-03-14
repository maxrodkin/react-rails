var ActiveItem= React.createClass({
    handleUpdate() {
//        this.props.handleUpdate(this.props.activeItem,this.props.activeItem.description+"\n"+ this.refs.description.value);
        this.props.handleUpdate(this.props.activeItem,this.refs.description.value);
    },

	
itemIsActive () { return typeof(this.props.activeItem)!='undefined'; } ,
itemIndexIsNatural () { return typeof(this.props.activeItemIndex)!='undefined'; } ,
itemIndexIsNotNegatve () { return this.props.activeItemIndex>=0; } ,

    render() {
		var messages = this.itemIndexIsNotNegatve() && <ul>{this.props.items[this.props.activeItemIndex].description.split('\n').map((item,index) => {return <li key={index}>{item}</li>})}</ul>;
        return (
                <div  >
					{this.itemIndexIsNotNegatve () &&
							<div id={this.props.items[this.props.activeItemIndex].id}>Чат с {this.props.items[this.props.activeItemIndex].name}:<br></br>
								<div >{messages}</div>
								Добавьте комментарий<br></br>
							<input ref='description' placeholder='Добавьте комментарий' />
							<button onClick={this.handleUpdate}>Update</button></div>
					}
                </div>

        )
    },
    render_old() {
		var messages = this.itemIsActive() && <ul>{this.props.activeItem.description.split('\n').map((item,index) => {return <li key={index}>{item}</li>})}</ul>;
        return (
                <div  >
					{this.itemIsActive() &&
							<div id={this.props.activeItem.id}>Чат с {this.props.activeItem.name}:<br></br>
								<div >{messages}</div>
								Добавьте комментарий<br></br>
							<input ref='description' placeholder='Добавьте комментарий' />
							<button onClick={this.handleUpdate}>Update</button></div>
					}
                </div>

        )
    }
});
