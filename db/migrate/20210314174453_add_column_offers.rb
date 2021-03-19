class AddColumnOffers < ActiveRecord::Migration[6.1]
  def change
    add_column :offers, :job_salary, :integer
    add_column :offers, :job_experience, :integer
    add_column :offers, :job_qualification, :integer
    add_column :offers, :job_level, :integer
  end
end
