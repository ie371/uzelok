<template>
<v-container grid-list-lg>
    <v-layout row wrap>

    <v-flex xs12 sm10 md4 lg6>
         <v-card-title primary-title>
          <div>
            <div>ПРОЕКТ</div>
          </div>
        </v-card-title>
                        <v-card ref="form">
                            <v-card-text>
                            <v-text-field
                                name='name_prj' 
                                
                                label="Название проекта"
                                
                                list='name_prj_list'
                            ></v-text-field>
                            <datalist id='name_prj_list'>
                                <option>Узел коммерческого учёта тепловой энергии, теплоносителя</option>
                                <option>Узел технологического учёта тепловой энергии, теплоносителя</option>
                            </datalist>


                            <v-text-field
                                name='cod' 
                                label="Шифр"
                            ></v-text-field>

                            <v-text-field
                                name='name_ooo' 
                                label="Название проектной организации"
                            ></v-text-field>

                            <v-text-field
                                name='GIP' 
                                label="ГИП"
                            ></v-text-field>

                             <v-text-field
                                name='razr' 
                                label="Разработал"
                            ></v-text-field>

                             <v-text-field
                                name='prov' 
                                label="Проверил"
                            ></v-text-field>

                            <v-text-field
                                name='tcontr' 
                                label="Технический контролер"
                            ></v-text-field>

                            <v-text-field
                                name='ncontr' 
                                label="Нормоконтролер"
                            ></v-text-field>

                            <!-- <v-autocomplete
                                ref="country"
                                :items="countries"
                                v-model="country"
                                label="Country"
                                placeholder="Select..."
                                required
                            ></v-autocomplete> -->

                            </v-card-text>

                            <v-divider class="mt-5"></v-divider>


                            <v-card-actions>
                            <!-- <v-btn flat>Cancel</v-btn>
                            <v-spacer></v-spacer>
                            <v-slide-x-reverse-transition>
                                <v-tooltip
                                v-if="formHasErrors"
                                left
                                >
                                <v-btn
                                    slot="activator"
                                    icon
                                    class="my-0"
                                    @click="resetForm"
                                >
                                    <v-icon>refresh</v-icon>
                                </v-btn>
                                <span>Refresh form</span>
                                </v-tooltip>
                            </v-slide-x-reverse-transition>
                            <v-btn color="primary" flat @click="submit">Submit</v-btn> -->
                            </v-card-actions>



                        </v-card>
    </v-flex>

    <v-flex xs12 sm10 md4 lg6>
         <v-card-title primary-title>
          <div>
            <div>ОБЪЕКТ</div>
          </div>
        </v-card-title>
                        <v-card ref="form">
                            <v-card-text>
                            <v-text-field
                                name='adress' 
                                label="Адрес"
                                placeholder='140180, Московская область, г. Жуковский, ул. Энергетическая, д. 15' 
                            ></v-text-field>
                            
                            <v-text-field
                                name='tip_obj'  
                                label="Тип объекта"
                                
                                list='tip_obj_list'
                            ></v-text-field>
                                <datalist id='tip_obj_list'>
                                    <option>Многоквартирный жилой дом</option>
                                    <option>Школа</option>
                                    <option>Детский сад</option>  
                                    <option>Административное здание</option> 
                                </datalist>

                            <v-text-field
                                name='zakazchik' 
                                label="Заказчик"
                                
                                
                            ></v-text-field>

                            <v-text-field
                                name='istochnik' 
                                label="Источник теплоснабжения"
                                 
                            ></v-text-field>

                            <v-text-field
                                name='resurscomp' 
                                label="Ресурсоснабжающая компания"
                                
                            ></v-text-field>

                            </v-card-text>

                            <v-divider class="mt-5"></v-divider>


                            <v-card-actions>
                            <v-checkbox
                                v-model="checkbox"
                                label="Печатать титульный лист"
                                
                                ></v-checkbox>
                            </v-card-actions>



                        </v-card>
    </v-flex>

    




        </v-layout>
</v-container>
</template>


<script>
export default {
    data() {
        return {
            // status: 'accepted'
            checkbox: false
        }
    },
}
</script>
<style>
  /* .v-text-field input {
    font-size: 0.9em;
  }
   */

</style>