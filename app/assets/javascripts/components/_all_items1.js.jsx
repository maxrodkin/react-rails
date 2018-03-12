var AllItems1 = React.createClass({
    handleDelete(id) {
        this.props.handleDelete(id);
    },
    handleClick(id) {
 				debugger;
       this.props.handleClick(id);
    },
    onUpdate(item) {
        this.props.onUpdate(item);
    },

    render() {
            var items= this.props.items.map((item) => {
				let name = <h3>{item.name}</h3>;
				let description = <p>{item.description}</p>;
                return (
                    <div key={item.id}
                        handleDelete={this.handleDelete.bind(this, item.id)}
                        handleUpdate={this.onUpdate}
						onClick={this.props.handleClick.bind(this, item.id)}
					>
						{name}
						{description}
						<button onClick={this.props.handleDelete} >Delete</button>
                    </div>
                )
            });

        return(
            <div>
                {items}
            </div>
       )
	}
});