class AddIndexOnChatId < ActiveRecord::Migration[5.1]
  def change
	add_index :items, :chat_id
  end
end
