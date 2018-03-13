class Api::V1::ItemsController < Api::V1::BaseController
  def index
    respond_with Item.all
  end

  def create
    respond_with :api, :v1, Item.create(item_params)
  end

  def destroy
    respond_with Item.destroy(params[:id])
  end

  def update
    item = Item.find(params["id"])
   item.update_attributes(item_params)
	item.description = item.description + "\n" +  item_params["description"]
	item.chat_id = item_params["chat_id"]
	item.bot_id = item_params["bot_id"]
	item.save
	print item_params
    respond_with item, json: item
  end

  private

  def item_params
    params.require(:item).permit(:id, :name, :description, :chat_id, :bot_id)
  end
end