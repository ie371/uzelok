<template>
  <div class="form-row">
    <!-- // ************************************************** -->
    <div class="col-md-3">
      <div class="text-center">
        <h5>
          <span class="badge">Общие параметры</span>
        </h5>
      </div>

      <div class="form-group">
        <!-- <div class='form-row'> -->
        <div class="col">
          <h6>
            <span class="badge">Системный блок</span>
          </h6>
          <select class="form-control form-control-sm" v-model="sb.tipSB">
            <option value="0">СБ-04 с блоком бесперебойного питания</option>
            <option value="1">СБ-04 с сетевым питанием</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Платы расширения</span>
          </h6>
          <multiselect
            v-model="plats"
            :options="options"
            :multiple="true"
            track-by="lib"
            :custom-label="customLabel"
            placeholder="Платы расширения"
            :option-height="34"
          ></multiselect>
          <!-- <treeselect 
                     :options="options" 
                      v-model="value"  
                     :multiple="multiple"
                     :clearable="clearable"
                     :open-on-click="openOnClick"
                      >
          </treeselect>-->
          <!-- <v-select multiple v-model="value" :options="options"></v-select> -->
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Длина кабельных проводок</span>
          </h6>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">ВРУ => СБ</label>
              <input type="text" class="form-control form-control-sm" v-model="sb.lvru">
            </div>
            <div class="col">
              <label class="col-form-label">СБ => ИМ ЦО</label>
              <input type="text" class="form-control form-control-sm" v-model="sb.lsbo">
            </div>
            <div class="col">
              <label class="col-form-label">СБ => ИМ ГВС</label>
              <input type="text" class="form-control form-control-sm" v-model="sb.lsbg">
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Климатология</span>
          </h6>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">Республика, край, область :</label>
              <select
                class="form-control form-control-sm"
                v-on:change="nasp"
                v-model="isx.selReg"
                name="region"
              >
                <option
                  v-for="region in regions"
                  v-bind:value="region.value"
                  :key="region.key"
                >{{ region.text }}</option>
              </select>
            </div>

            <div class="col">
              <label class="col-form-label">Населенный пункт:</label>
              <select
                class="form-control form-control-sm"
                v-model="isx.indexnas"
                :disabled=" isx.selReg == 0"
                name="naspunkt"
              >
                <option v-for="mes in isx.mess" :key="mes.key">{{ mes.item}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="col">
          <h6>
            <span class="badge">Вставка внешних файлов</span>
          </h6>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">Принципиальная схема</label>
              <input
                type="file"
                id="fileImagePrSx"
                name="princ_sx_uploads"
                accept="image/jpeg, image/png"
                style="font-size:0.8em;"
                @change="ImageSPL"
              >
            </div>
            <div class="col">
              <label class="col-form-label">Формат листа:</label>
              <select
                class="form-control form-control-sm"
                name="formatPRSX"
                :disabled="otklFormatPrSx"
              >
                <option value="A3">А3</option>
                <option value="A2">А2</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="col">
              <label class="col-form-label">Ситуационный план</label>
              <input
                type="file"
                id="fileImageSPL"
                name="sitplan_uploads"
                accept="image/jpeg, image/png"
                style="font-size:0.8em;"
                @change="ImageSPL"
              >
            </div>
            <div class="col">
              <label class="col-form-label">Формат листа:</label>
              <select
                class="form-control form-control-sm"
                name="formatSitPl"
                :disabled="otklFormatSPL"
              >
                <option value="A3">А3</option>
                <option value="A2">А2</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- // ************************************************** -->
    <div class="col-md-3 px-3 border-left border-warning">
      <div class="text-center">
        <h5>
          <span class="badge">{{info}}</span>
        </h5>
      </div>

      <div class="form-group">
        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Qco, Гкал/ч</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Qцо"
              v-model="isx.qco"
              v-on:input="proj('qco')"
              step="0.0000001"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="8"
            >
          </div>

          <div class="col-md-5">
            <label class="col-form-label">Схема теплоснабжения</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.sx_otkr"
              @change="proj('wgvs'+$event.target.value)"
              :disabled="disablOtkr.diso"
            >
              <option value="0">закрытая</option>
              <option value="1">открытая с ИМ на ГВС</option>
              <option value="2">открытая без ИМ на ГВСЦ</option>
              <option value="3">открытая без ИМ на ГВСТ</option>
            </select>
          </div>

          <div class="col">
            <label class="col-form-label">Формула учета</label>
            <select class="form-control form-control-sm" v-model="isx.fuCo" :disabled="fu_Co">
              <option value="0">закрытая (М1 = М2)</option>
              <option value="1">открытая (М1 - М2)</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Тип изм. линии</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.tipLo"
              :class="{'red-error' : ml.o }"
              @change="proj('qco')"
              id="mlo"
            >
              <option value="kl">Классическая</option>
              <option value="ml">Модифицированная</option>
            </select>
            <b-popover :disabled="!ml.o" :show="ml.o" triggers="hover" target="mlo">{{popup.m}}</b-popover>
          </div>
          <div class="col">
            <label class="col-form-label">Фильтр</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.filo"
              :disabled="fo"
              :class="{'red-error' : grz.o }"
              @change="proj('qco')"
            >
              <option value="0">без фильтра</option>
              <option value="1">сетчатый фильтр</option>
              <option value="2">грязевик</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Схема присоединения</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.sx_ot"
              @change="proj('sx_ot'+$event.target.value)"
            >
              <option value="0">зависимая</option>
              <option value="1">независимая (с подпиткой)</option>
            </select>
          </div>
          <div class="col" v-if="+isx.sx_ot">
            <label class="col-form-label">Фильтр подпитки</label>
            <select class="form-control form-control-sm" v-model="isx.filp">
              <option value="0">без фильтра</option>
              <option value="1">сетчатый фильтр</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="form-row mb-1">
          <div class="col">
            <label class="col-form-label"></label>
          </div>
          <div class="col text-maroon text-s">Подача Т1</div>
          <div class="col text-blue text-s">Обратка Т2</div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Tемп график, °C</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T1"
              v-model="isx.t1"
              v-on:input="proj('')"
              step="0.1"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            >
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T2"
              v-model="isx.t2"
              v-on:input="proj('')"
              step="0.1"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            >
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Давление, мвст</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="50"
              v-model="isx.p1"
              v-on:input="proj('')"
            >
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="40"
              v-model="isx.p2"
              v-on:input="proj('')"
            >
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Расход, м³/ч</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model.number="rescalc.gdr1.Gv"
              v-on:input="rash('t1')"
              step="0.001"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            >
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="rescalc.gdr2.Gv"
              disabled
            >
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Ду прибора</label>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.di1"
              v-on:change="change_du('t1','peres')"
            >
              <option
                v-for="(option, index) in optionso"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="select_T2.dim"
              disabled
            >
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Скорость, м/с</label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="rescalc.gdr1.V"
              :class="{'red-error' : !speed.v0 }"
              id="V1"
              readonly
            >
            <b-popover
              :disabled="speed.v0"
              :show="!speed.v0"
              triggers="hover"
              target="V1"
            >{{popup.s}}</b-popover>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="rescalc.gdr2.V"
              disabled
            >
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">ИМ отопление</label>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.tipIMo"
              :class="{'red-error' : check6.y1 }"
              @change="proj('qco')"
              id="im1"
            >
              <option value="6">И6</option>
              <option value="5">К5</option>
            </select>

            <b-popover
              :disabled="!check6.y1"
              :show="check6.y1"
              triggers="hover"
              target="im1"
            >{{popup.d}}</b-popover>
          </div>

          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="this.select_T2.im"
              disabled
            >
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Ду тр-дов Т1/Т2</label>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.dut1"
              v-on:change="change_du('t1','peres')"
            >
              <option
                v-for="(option, index) in diptr.duu1"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="this.select_T2.dtr"
              disabled
            >
          </div>
        </div>
        <div class="form-row mb-2" v-if="+isx.sx_ot">
          <div class="form-row mb-1">
            <label class="col-form-label">Подпитка:</label>
          </div>

          <div class="form-row mb-1">
            <div class="col">
              <label class="col-form-label">Расх.,м³/ч</label>
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="rescalc.gdr9.Gv"
                readonly
                step="0.001"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="5"
              >
            </div>

            <div class="col">
              <label class="col-form-label">Ду ИМ</label>
              <select
                class="form-control form-control-sm"
                v-model="isx.di9"
                v-on:change="change_du('t9','peres')"
              >
                <option
                  v-for="(option, index) in optionso"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.text }}</option>
              </select>
            </div>
            <div class="col">
              <label class="col-form-label">Скорость</label>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="rescalc.gdr9.V"
                :class="{'red-error' : !speed.v1 }"
                id="V9"
                readonly
              >
            </div>
            <b-popover :disabled="speed.v1" triggers="hover focus" target="V9">{{popup.s}}</b-popover>
            <div class="col">
              <label class="col-form-label">Ду Т94</label>
              <select
                class="form-control form-control-sm"
                v-model="isx.dut9"
                v-on:change="change_du('t9','peres')"
              >
                <option
                  v-for="(option,index) in diptr.duu9"
                  v-bind:value="option.value"
                  :key="index"
                >{{ option.text }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3 px-3 border-left border-warning">
      <div class="text-center">
        <h5>
          <span class="badge">{{infg}}</span>
        </h5>
      </div>

      <div class="form-group">
        <div class="form-row">
          <div class="col-md-3">
            <label class="col-form-label">Qmax, Гкал/ч</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Qmax"
              step="0.0000001"
              v-model="isx.qmax"
              v-on:input="proj('qmax')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="8"
              v-b-popover.hover.bottomright.html="popup.qm"
            >
          </div>

          <div class="col-md-3">
            <label class="col-form-label">Qсред, Гкал/ч</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Qср"
              step="0.0000001"
              v-model="isx.qgvssr"
              v-on:input="proj('qgvssr')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="8"
              v-b-popover.hover.bottomright.html="popup.qs"
            >
          </div>

          <div class="col">
            <label class="col-form-label">Схема теплоснабжения</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.sx_gvs_dep"
              @change="proj('itp'+$event.target.value)"
              :disabled="disablOtkr.disg"
            >
              <option value="0">открытая</option>
              <option value="1">закрытая 1 ступ</option>
              <option value="2">закрытая 2-х ступ</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Тип изм. линии</label>
            <select
              class="form-control form-control-sm"
              v-model="isx.tipLg"
              :class="{'red-error' : ml.g }"
              @change="proj('qmax')"
              id="mlg"
              :disabled="stup"
            >
              <option value="kl">Классическая</option>
              <option value="ml">Модифицированная</option>
            </select>
            <b-popover :disabled="!ml.g" :show="ml.g" triggers="hover" target="mlg">{{popup.m}}</b-popover>
          </div>
          <div class="col">
            <label class="col-form-label">Фильтр</label>
            <select
              class="form-control form-control-sm"
              id="fig"
              v-model="isx.filg"
              :disabled="fg||stup"
              :class="{'red-error' : grz.g }"
              @change="proj('qmax')"
            >
              <option value="0">без фильтра</option>
              <option value="1">сетчатый фильтр</option>
              <option value="2">грязевик</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <label class="col-form-label">Кчн</label>
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="Кчн"
              step="0.1"
              v-model="isx.kch"
              v-on:input="cre"
              v-b-popover.hover.bottomright.html="popup.kc"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
            >
          </div>

          <div class="col">
            <label class="col-form-label">Тхвл</label>
            <input
              type="number"
              step="0.1"
              class="form-control form-control-sm"
              v-model="isx.txvL"
              value="15"
              v-on:input="proj('')"
              v-b-popover.hover.bottomright="'Температура хол. воды (лето - 15 °С)'"
            >
          </div>

          <div class="col">
            <label class="col-form-label">Тхвз</label>
            <input
              type="number"
              step="0.1"
              class="form-control form-control-sm"
              v-model="isx.txvZ"
              value="5"
              v-on:input="proj('')"
              v-b-popover.hover.bottomright="'Температура хол. воды (зима - 5 °С)'"
            >
          </div>

          <div class="col">
            <label class="col-form-label">Кнп</label>
            <input
              type="number"
              class="form-control form-control-sm"
              step="0.01"
              v-model="isx.knp"
              v-on:input="proj('')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент, учитывающий уменьшение расхода тепла в трубопроводах ГВС в летний период'"
            >
          </div>

          <div class="col">
            <label class="col-form-label">Ктп</label>
            <input
              type="number"
              class="form-control form-control-sm"
              step="0.01"
              v-model="isx.ktp"
              v-on:input="proj('')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент, учитывающий потери тепла в трубопроводах '"
            >
          </div>
          <div class="col">
            <label class="col-form-label">&beta;</label>
            <input
              type="number"
              class="form-control form-control-sm"
              step="0.01"
              v-model="isx.beta"
              v-on:input="proj('')"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              v-b-popover.hover.bottomright="'коэффициент запаса на разрегулировку стояков ГВС'"
            >
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label"></label>
          </div>

          <div class="col text-maroon text-s">Подача Т3</div>
          <div class="col text-blue text-s">Обратка Т4</div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Tемп график, °C</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T3"
              v-model="isx.t3"
              v-on:input="proj('')"
              step="0.1"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            >
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="T4"
              v-model="isx.t4"
              v-on:input="proj('')"
              step="0.1"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
            >
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Давление, мвст</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="50"
              v-model="isx.p3"
              v-on:input="proj('')"
              :disabled="stup"
            >
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              placeholder="40"
              v-model="isx.p4"
              v-on:input="proj('')"
              :disabled="stup"
            >
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Расход, м³/ч</label>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="rescalc.gdr3.Gv"
              v-on:input="rash('t3')"
              step="0.001"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="5"
              :disabled="stup"
            >
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control form-control-sm"
              v-model="rescalc.gdr4.Gv"
              disabled
            >
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Ду прибора</label>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.di3"
              v-on:change="change_du('t3','peres')"
              :disabled="stup"
            >
              <option
                v-for="(option, index) in optionso"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.di4"
              v-on:change="change_du('t4','peres')"
              :disabled="im4||stup"
            >
              <option
                v-for="(option, index) in optionso"
                v-bind:value="option.value"
                :key="index"
              >{{ option.text }}</option>
            </select>
          </div>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Скорость, м/с</label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="rescalc.gdr3.V"
              :class="{'red-error' : !speed.v2 }"
              id="V3"
              readonly
            >
          </div>
          <b-popover :disabled="speed.v2" :show="!speed.v2" triggers="hover" target="V3">{{popup.s}}</b-popover>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="rescalc.gdr4.V"
              :class="{'red-error' : !speed.v3 }"
              id="V4"
              readonly
            >
          </div>
          <b-popover :disabled="speed.v3" :show="!speed.v3" triggers="hover" target="V4">{{popup.s}}</b-popover>
        </div>

        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">ИМ ГВС</label>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.tipIMg3"
              :class="{'red-error' : check6.y3 }"
              @change="proj('qmax',1)"
              id="im3"
              :disabled="stup"
            >
              <option value="6">И6</option>
              <option value="5">К5</option>
            </select>
            <b-popover
              :disabled="!check6.y3"
              :show="check6.y3"
              triggers="hover"
              target="im3"
            >{{popup.d}}</b-popover>
          </div>
          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.tipIMg4"
              :class="{'red-error' : check6.y4 }"
              id="im4"
              :disabled="stup"
            >
              <option value="6">И6</option>
              <option value="5">К5</option>
            </select>
            <b-popover
              :disabled="!check6.y4"
              :show="check6.y4"
              triggers="hover"
              target="im4"
            >{{popup.d}}</b-popover>
          </div>
        </div>
        <div class="form-row mb-2">
          <div class="col">
            <label class="col-form-label">Ду тр-дов Т3/Т4</label>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.dut3"
              v-on:change="change_du('t3','peres')"
              :disabled="stup"
            >
              <option
                v-for="(option,index) in diptr.duu3"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>

          <div class="col">
            <select
              class="form-control form-control-sm"
              v-model="isx.dut4"
              v-on:change="change_du('t4','peres')"
              :disabled="stup"
            >
              <option
                v-for="(option,index) in diptr.duu4"
                v-bind:value="option.value"
                :key="index"
              >{{ option.value }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- // ************************************************** -->
    <div class="col-md-3 px-3 border-left border-warning">
      <div class="text-center">
        <h5>
          <span class="badge">Принципиальная схема</span>
        </h5>
      </div>

      <div class="form-group">
        <b-row>
          <div class="col-md-12">
            <img
              id="sximageog"
              v-bind:src="imgsx.sx"
              width="100%"
              @click="showModal"
              style="cursor: pointer;"
            >
            <b-modal ref="myModalRef" hide-footer title="Принципиальная схема узла учета" size="lg">
              <div class="d-block text-center">
                <img id="sximageog" v-bind:src="imgsx.sx" width="100%">
              </div>
              <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Закрыть</b-btn>
            </b-modal>
          </div>
        </b-row>
      </div>

      <div class="d-flex justify-content-center">
        <div class="col-md-9">
          <b-btn
            type="submit"
            variant="primary"
            formaction="./pdf/project/kp.php"
            :disabled="disButKP ? true : false"
            class="btn btn-sm btn-block mb-3"
          >Создать КП</b-btn>

          <!-- <b-btn v-b-modal.modallg variant="warning" class="btn btn-sm btn-block mb-3">Текст КП</b-btn> -->
          <b-btn
            type="submit"
            class="btn btn-sm btn-block mb-3"
            formaction="./pdf/project/pr.php"
            v-if="isUserAuthenticated"
            :disabled="imgsx.bf7 ===1 ? true : false"
          >
            Создать проект
            <b-badge variant="light">{{imgsx.zz}}</b-badge>
          </b-btn>

          <!-- <b-btn 
                        type='submit' variant="primary" formaction='./pdf/project/test.php'
                        class="btn btn-sm btn-block mb-3"
                        @click="axio"                       
                        >
                       test JSON 
                        
          </b-btn>-->
          <b-modal
            id="modallg"
            size="lg"
            title="Редактируемые поля коммерческого предложения"
            v-model="show"
          >
            <div class="container-fluid">
              <div class="col">
                <div class="form-group">
                  <label for="tkp">Шапка КП</label>
                  <textarea class="form-control" id="tkp" name="tkp" rows="4" v-model="top"></textarea>
                </div>

                <div class="form-group">
                  <label for="bkp">Низ КП</label>
                  <textarea class="form-control" id="bkp" name="bkp" rows="4" v-model="bottom"></textarea>
                </div>
              </div>
            </div>

            <div slot="modal-footer" class="w-100">
              <b-btn size="sm" class="float-right" variant="primary" @click="onOk">Закрыть</b-btn>
            </div>
          </b-modal>

          <!-- <div class='form-group'>
                            <b-row>
          <div class='col-md-6' style="font-size:.7em;">-->
          <!-- <ul id="example-1">
                                    <li v-for="(item, index) in rescalc.OT" :key="index">
                                        {{ item }} - {{index}} 
                                    
                                    </li>
          </ul>-->
          <!-- <ul id="example-2">
                                    <li v-for="(item, index) in rescalc.Ggvs" :key="index">
                                        {{index}}: {{ item }}
                                    
                                    </li>
          </ul>-->
          <!-- Основное оборудование - {{plats.length+1}}<br> -->
          <!-- Узел учета ЦО NPOZ:
                                <ul id="example-1">
                                    <li v-for="(item, index) in pozOt.arNPOZot" :key="index">
                                        поз. - {{ item }} - {{index}}
                                        
                                    </li>
          </ul>-->
          <!-- Узел учета CO NPOZ:
                                <ul id="example-1">
                                    <li v-for="(item, index) in pozOt.arNPOZot" :key="index">
                                        {{index}} - {{ item }} 
                                        
                                    </li>
          </ul>-->
          <!-- Узел учета ГВС:
                                <ul id="example-1">
                                    <li v-for="(item, index) in pozOt.arNPOZgvs" :key="index">
                                        поз. - {{ item }} - {{index}} 
                                        
                                    </li>
          </ul>-->
          <!--                                     
                                </div>

                                <div class='col-md-6' style="font-size:.7em;">

                                Узел учета GVS  NPOZ:
                                <ul id="example-1">
                                    <li v-for="(item, index) in pozOt.arNPOZgvs" :key="index">
                                        {{index}} - {{ item }}
                                        
                                    </li>
                                    </ul>
    
                                    
                                </div>
                            </b-row>
          </div>-->
          <input type="hidden" name="A" v-model="php">
          <input type="hidden" name="B" v-model="phpS">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import clc_pr from "../store/calc_pr.js";
import clc_kp from "../store/calc_kp.js";
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect
  },

  data() {
    return {
      plats: [
        {
          plt: "GSM-модем",
          lib: "gsm"
        },
        {
          plt: "USBA",
          lib: "usba"
        }
      ],
      pozOtisx: {
        im1: { id: 0, name: "im1", col: 2 },
        im9: { id: 1, name: "im9", col: 0 },
        sensT: { id: 2, name: "sensT", col: 1 },
        sensD: { id: 3, name: "sensD", col: 2 },
        kr9: { id: 4, name: "kr9", col: 0 },
        kr1: { id: 5, name: "kr1", col: 4 },
        kr11: { id: 6, name: "kr11", col: 0 },
        filtr1: { id: 7, name: "filtr1", col: 0 },
        filtr9: { id: 8, name: "filtr9", col: 0 },
        kr3x: { id: 9, name: "kr3x", col: 4 },
        man: { id: 10, name: "man", col: 4 },
        term: { id: 11, name: "term", col: 2 },
        terman: { id: 12, name: "terman", col: 0 },
        spu15: { id: 13, name: "spu15", col: 2 },
        spu25: { id: 14, name: "spu25", col: 0 },
        vst1: { id: 15, name: "vst1", col: 2 },
        vst9: { id: 16, name: "vst9", col: 0 }
      },
      pozGVSisx: {
        im4: { id: 0, name: "im4", col: 1 },
        im3: { id: 1, name: "im3", col: 1 },
        sensT: { id: 2, name: "sensT", col: 1 },
        sensD: { id: 3, name: "sensD", col: 2 },
        kr4: { id: 4, name: "kr4", col: 2 },
        kr3: { id: 5, name: "kr3", col: 2 },
        kr44: { id: 6, name: "kr44", col: 0 },
        kr33: { id: 7, name: "kr33", col: 0 },
        ok: { id: 8, name: "ok", col: 1 },
        filtr4: { id: 9, name: "filtr4", col: 0 },
        filtr3: { id: 10, name: "filtr3", col: 0 },
        kr3x: { id: 11, name: "kr3x", col: 4 },
        man: { id: 12, name: "man", col: 4 },
        term: { id: 13, name: "term", col: 2 },
        terman: { id: 14, name: "terman", col: 0 },
        spu15: { id: 15, name: "spu15", col: 2 },
        spu25: { id: 16, name: "spu25", col: 0 },
        vst4: { id: 17, name: "vst4", col: 1 },
        vst3: { id: 18, name: "vst3", col: 1 }
      },
      options: [
        {
          plt: "GSM-модем",
          lib: "gsm"
        },
        {
          plt: "USBA",
          lib: "usba"
        },
        {
          plt: "Ethernet ПРС-802",
          lib: "prs802"
        },
        {
          plt: "RS485E",
          lib: "rs485"
        }
      ],
      regions: [
        {
          text: "Без климатологии",
          value: "0"
        },
        {
          text: "Алтайский край",
          value: "1"
        },
        {
          text: "Амурская область",
          value: "2"
        },
        {
          text: "Архангельская область",
          value: "3"
        },
        {
          text: "Астраханская область",
          value: "4"
        },
        {
          text: "Белгородская область",
          value: "5"
        },
        {
          text: "Брянская область",
          value: "6"
        },
        {
          text: "Владимирская область",
          value: "7"
        },
        {
          text: "Волгоградская область",
          value: "8"
        },
        {
          text: "Вологодская область",
          value: "9"
        },
        {
          text: "Воронежская область",
          value: "10"
        },
        {
          text: "Ивановская область",
          value: "11"
        },
        {
          text: "Иркутская область",
          value: "12"
        },
        {
          text: "Кабардино- Балкарская Республика",
          value: "13"
        },
        {
          text: "Калининградская область",
          value: "14"
        },
        {
          text: "Калужская область",
          value: "15"
        },
        {
          text: "Камчатская область",
          value: "16"
        },
        {
          text: "Карачаево-Черкесская Республика",
          value: "17"
        },
        {
          text: "Кемеровская область",
          value: "18"
        },
        {
          text: "Кировская область",
          value: "19"
        },
        {
          text: "Костромская область",
          value: "20"
        },
        {
          text: "Краснодарский край",
          value: "21"
        },
        {
          text: "Красноярский край",
          value: "22"
        },
        {
          text: "Курганская область",
          value: "23"
        },
        {
          text: "Курская область",
          value: "24"
        },
        {
          text: "Ленинградская область",
          value: "25"
        },
        {
          text: "Липецкая область",
          value: "26"
        },
        {
          text: "Магаданская область",
          value: "27"
        },
        {
          text: "Московская область",
          value: "28"
        },
        {
          text: "Мурманская область",
          value: "29"
        },
        {
          text: "Ненецкий АО  (Архангельская область)",
          value: "30"
        },
        {
          text: "Нижегородская область",
          value: "31"
        },
        {
          text: "Новгородская область",
          value: "32"
        },
        {
          text: "Новосибирская область",
          value: "33"
        },
        {
          text: "Омская область",
          value: "34"
        },
        {
          text: "Оренбургская область",
          value: "35"
        },
        {
          text: "Орловская область",
          value: "36"
        },
        {
          text: "Пензенская область",
          value: "37"
        },
        {
          text: "Пермская область",
          value: "38"
        },
        {
          text: "Приморский край",
          value: "39"
        },
        {
          text: "Псковская область",
          value: "40"
        },
        {
          text: "Республика Адыгея",
          value: "41"
        },
        {
          text: "Республика Алтай",
          value: "42"
        },
        {
          text: "Республика Башкортостан",
          value: "43"
        },
        {
          text: "Республика Бурятия",
          value: "44"
        },
        {
          text: "Республика Дагестан",
          value: "45"
        },
        {
          text: "Республика Калмыкия",
          value: "46"
        },
        {
          text: "Республика Карелия",
          value: "47"
        },
        {
          text: "Республика Коми",
          value: "48"
        },
        {
          text: "Республика Марий Эл",
          value: "49"
        },
        {
          text: "Республика Мордовия",
          value: "50"
        },
        {
          text: "Республика Саха (Якутия)",
          value: "51"
        },
        {
          text: "Республика Северная Осетия - Алания",
          value: "52"
        },
        {
          text: "Республика Татарстан",
          value: "53"
        },
        {
          text: "Республика Тыва",
          value: "54"
        },
        {
          text: "Республика Хакассия",
          value: "55"
        },
        {
          text: "Ростовская область",
          value: "56"
        },
        {
          text: "Рязанская область",
          value: "57"
        },
        {
          text: "Самарская область",
          value: "58"
        },
        {
          text: "Саратовская область",
          value: "59"
        },
        {
          text: "Сахалинская область",
          value: "60"
        },
        {
          text: "Свердловская область",
          value: "61"
        },
        {
          text: "Смоленская область",
          value: "62"
        },
        {
          text: "Ставропольский край",
          value: "63"
        },
        {
          text: "Тамбовская область",
          value: "64"
        },
        {
          text: "Тверская область",
          value: "65"
        },
        {
          text: "Томская область",
          value: "66"
        },
        {
          text: "Тульская область",
          value: "67"
        },
        {
          text: "Тюменская область",
          value: "68"
        },
        {
          text: "Удмуртская Республика",
          value: "69"
        },
        {
          text: "Ульяновская область",
          value: "70"
        },
        {
          text: "Хабаровский край",
          value: "71"
        },
        {
          text: "Челябинская область",
          value: "72"
        },
        {
          text: "Чеченская Республика",
          value: "73"
        },
        {
          text: "Читинская область",
          value: "74"
        },
        {
          text: "Чувашская Республика",
          value: "75"
        },
        {
          text: "Чукотский АО (Магаданская область)",
          value: "76"
        },
        {
          text: "Ярославская область",
          value: "77"
        },
        {
          text: "Республика Крым",
          value: "78"
        }
      ],
      info: "Параметры ЦО",
      ro: true,
      fo: false,
      infg: "Параметры ГВС",
      rg: true,
      fg: false,
      im4: true,
      top: "",
      bottom: "Но й",
      show: false,
      stup: false,
      stup4: false,
      otklFormatSPL: true,
      otklFormatPrSx: true,
      file: null

      // multiple: true,
      // value: ['gsm','usba'],
      // openOnClick: true,
      // clearable: false,
    };
  },
  computed: {
    pozOt() {
      let i = this.plats.length + 2;
      let arNPOZot = {};
      let arNPOZgvs = {};
      let arCOLot = {};
      let arCOLgvs = {};

      if (this.isx.pr_ot !== 0) {
        //  модифицированная
        if (this.isx.tipLo === "ml") {
          this.pozOtisx.kr1.col = 2;
          this.pozOtisx.kr11.col = 2;

          if (this.isx.tipIMo == 6) {
            this.pozOtisx.kr3x.col = 0;
            this.pozOtisx.man.col = 0;
            this.pozOtisx.term.col = 0;
            this.pozOtisx.terman.col = 2;
          } else {
            this.pozOtisx.kr3x.col = 2;
            this.pozOtisx.man.col = 0;
            this.pozOtisx.term.col = 0;
            this.pozOtisx.terman.col = 2;
          }

          if (this.isx.sx_ot > 0) {
            this.pozOtisx.im9.col = 1;
            this.pozOtisx.kr9.col = 2;
            this.pozOtisx.vst9.col = 1;
            this.pozOtisx.spu15.col = 3;

            if (this.isx.filp > 0) {
              this.pozOtisx.filtr9.col = 1;
              this.pozOtisx.man.col = 2;

              if (this.isx.tipIMo == 6) {
                this.pozOtisx.kr3x.col = 2;
              } else {
                this.pozOtisx.kr3x.col = 4;
              }
            } else {
              this.pozOtisx.filtr9.col = 0;
            }
          } else {
            this.pozOtisx.im9.col = 0;
            this.pozOtisx.kr9.col = 0;
            this.pozOtisx.vst9.col = 0;
            this.pozOtisx.spu15.col = 2;
            this.pozOtisx.filtr9.col = 0;
          }

          // классическая
        } else {
          this.pozOtisx.kr1.col = 4;
          this.pozOtisx.kr11.col = 0;

          if (this.isx.tipIMo == 6) {
            this.pozOtisx.kr3x.col = 4;
            this.pozOtisx.man.col = 4;
            this.pozOtisx.term.col = 2;
            this.pozOtisx.terman.col = 0;
          } else {
            this.pozOtisx.kr3x.col = 6;
            this.pozOtisx.man.col = 4;
            this.pozOtisx.term.col = 2;
            this.pozOtisx.terman.col = 0;
          }

          if (this.isx.sx_ot > 0) {
            this.pozOtisx.im9.col = 1;
            this.pozOtisx.kr9.col = 2;
            this.pozOtisx.vst9.col = 1;
            this.pozOtisx.spu15.col = 3;

            if (this.isx.filp > 0) {
              this.pozOtisx.filtr9.col = 1;
              this.pozOtisx.man.col = 6;

              if (this.isx.tipIMo == 6) {
                this.pozOtisx.kr3x.col = 6;
              } else {
                this.pozOtisx.kr3x.col = 8;
              }
            } else {
              this.pozOtisx.filtr9.col = 0;
            }
          } else {
            this.pozOtisx.im9.col = 0;
            this.pozOtisx.kr9.col = 0;
            this.pozOtisx.vst9.col = 0;
            this.pozOtisx.spu15.col = 2;
            this.pozOtisx.filtr9.col = 0;
          }
        }

        if (this.isx.filo > 0) {
          this.pozOtisx.filtr1.col = 1;
          this.pozOtisx.man.col = this.pozOtisx.man.col + 2;
          this.pozOtisx.kr3x.col = this.pozOtisx.kr3x.col + 2;
          if (this.isx.filo > 1) {
            this.pozOtisx.spu25.col = 2;
          } else {
            this.pozOtisx.spu25.col = 0;
          }
        } else {
          this.pozOtisx.filtr1.col = 0;
          this.pozOtisx.spu25.col = 0;
        }

        let temp01 = Object.entries(this.pozOtisx);
        temp01.forEach(function(item) {
          if (item[1].col > 0) {
            arNPOZot[item[1].name] = i;
            arCOLot[item[1].name] = item[1].col;
            i++;
          }
        });
      }

      if (this.isx.pr_gvs !== 0) {
        //с циркуляцией
        if (this.isx.sx_gvs < 1) {
          this.pozGVSisx.sensD.col = 2;
          this.pozGVSisx.spu15.col = 2;

          //  модули
          if (+this.isx.di3 !== +this.isx.di4) {
            this.pozGVSisx.im4.col = 1;
            this.pozGVSisx.vst4.col = 1;
            this.pozGVSisx.im3.col = 1;
            this.pozGVSisx.vst3.col = 1;
          } else {
            this.pozGVSisx.im4.col = 0;
            this.pozGVSisx.vst4.col = 0;
            this.pozGVSisx.im3.col = 2;
            this.pozGVSisx.vst3.col = 2;
          }

          //  модифицированная
          if (this.isx.tipLg === "ml") {
            this.pozGVSisx.ok.col = 0;
            this.pozGVSisx.filtr3.col = 0;
            this.pozGVSisx.filtr4.col = 0;

            if (+this.isx.di3 !== +this.isx.di4) {
              this.pozGVSisx.kr3.col = 1;
              this.pozGVSisx.kr33.col = 1;
              this.pozGVSisx.kr4.col = 1;
              this.pozGVSisx.kr44.col = 1;
            } else {
              this.pozGVSisx.kr3.col = 2;
              this.pozGVSisx.kr33.col = 2;
              this.pozGVSisx.kr4.col = 0;
              this.pozGVSisx.kr44.col = 0;
            }

            if (this.isx.tipIMg3 == 6) {
              this.pozGVSisx.kr3x.col = 0;
              this.pozGVSisx.man.col = 0;
              this.pozGVSisx.term.col = 0;
              this.pozGVSisx.terman.col = 2;
            } else {
              this.pozGVSisx.kr3x.col = 2;
              this.pozGVSisx.man.col = 0;
              this.pozGVSisx.term.col = 0;
              this.pozGVSisx.terman.col = 2;
            }

            // классическая
          } else {
            this.pozGVSisx.ok.col = 1;
            this.pozGVSisx.kr33.col = 0;
            this.pozGVSisx.kr44.col = 0;

            if (+this.isx.dut3 !== +this.isx.dut4) {
              this.pozGVSisx.kr3.col = 2;
              this.pozGVSisx.kr4.col = 2;
            } else {
              this.pozGVSisx.kr3.col = 4;
              this.pozGVSisx.kr4.col = 0;
            }

            if (this.isx.tipIMg3 == 6) {
              this.pozGVSisx.kr3x.col = 4;
              this.pozGVSisx.man.col = 4;
              this.pozGVSisx.term.col = 2;
              this.pozGVSisx.terman.col = 0;
            } else {
              this.pozGVSisx.kr3x.col = 6;
              this.pozGVSisx.man.col = 4;
              this.pozGVSisx.term.col = 2;
              this.pozGVSisx.terman.col = 0;
            }

            if (this.isx.filg > 0) {
              if (+this.isx.dut3 !== +this.isx.dut4) {
                this.pozGVSisx.filtr3.col = 1;
                this.pozGVSisx.filtr4.col = 1;
              } else {
                this.pozGVSisx.filtr3.col = 2;
                this.pozGVSisx.filtr4.col = 0;
              }

              this.pozGVSisx.man.col = this.pozGVSisx.man.col + 2;
              this.pozGVSisx.kr3x.col = this.pozGVSisx.kr3x.col + 2;

              if (this.isx.filg > 1) {
                this.pozGVSisx.spu25.col = 2;
              } else {
                this.pozGVSisx.spu25.col = 0;
              }
            } else {
              this.pozGVSisx.filtr3.col = 0;
              this.pozGVSisx.filtr4.col = 0;
              this.pozGVSisx.spu25.col = 0;
            }
          }
        } else {
          this.pozGVSisx.sensD.col = 1;
          this.pozGVSisx.spu15.col = 1;
          //  модули
          this.pozGVSisx.im3.col = 1;
          this.pozGVSisx.im4.col = 0;
          this.pozGVSisx.vst3.col = 1;
          this.pozGVSisx.vst4.col = 0;
          this.pozGVSisx.ok.col = 0;
          this.pozGVSisx.filtr4.col = 0;
          this.pozGVSisx.kr4.col = 0;
          this.pozGVSisx.kr44.col = 0;

          //  модифицированная
          if (this.isx.tipLg === "ml") {
            this.pozGVSisx.filtr3.col = 0;
            this.pozGVSisx.kr3.col = 1;
            this.pozGVSisx.kr33.col = 1;
            this.pozGVSisx.man.col = 0;
            this.pozGVSisx.term.col = 0;
            this.pozGVSisx.terman.col = 1;

            if (this.isx.tipIMg3 == 6) {
              this.pozGVSisx.kr3x.col = 0;
            } else {
              this.pozGVSisx.kr3x.col = 1;
            }

            // классическая
          } else {
            this.pozGVSisx.kr3.col = 2;
            this.pozGVSisx.kr33.col = 0;
            this.pozGVSisx.man.col = 2;
            this.pozGVSisx.term.col = 1;
            this.pozGVSisx.terman.col = 0;

            if (this.isx.tipIMg3 == 6) {
              this.pozGVSisx.kr3x.col = 2;
            } else {
              this.pozGVSisx.kr3x.col = 3;
            }

            if (this.isx.filg > 0) {
              this.pozGVSisx.filtr3.col = 1;
              this.pozGVSisx.man.col = this.pozGVSisx.man.col + 1;
              this.pozGVSisx.kr3x.col = this.pozGVSisx.kr3x.col + 1;
              if (this.isx.filg > 1) {
                this.pozGVSisx.spu25.col = 1;
              } else {
                this.pozGVSisx.spu25.col = 0;
              }
            } else {
              this.pozGVSisx.filtr3.col = 0;
              this.pozGVSisx.filtr4.col = 0;
              this.pozGVSisx.spu25.col = 0;
            }
          }
        }

        let temp02 = Object.entries(this.pozGVSisx);
        temp02.forEach(function(item) {
          if (item[1].col > 0) {
            arNPOZgvs[item[1].name] = i;
            arCOLgvs[item[1].name] = item[1].col;
            i++;
          }
        });
      }

      // console.log('arCOLot',arCOLot)
      // console.log('arNPOZot',arNPOZot)
      // console.log('arNPOZgvs',arNPOZgvs)

      return { arNPOZot, arCOLot, arNPOZgvs, arCOLgvs };
    },

    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
    isx() {
      return this.$store.getters.getisxcalc;
    },
    rescalc() {
      return this.$store.getters.getrescalc;
    },
    sb() {
      return this.$store.getters.getSbKp;
    },
    php() {
      let plll = { plt: this.plats };
      let ppp = JSON.stringify(
        Object.assign({}, this.isx, this.rescalc, this.sb, plll)
      );
      return ppp;
    },
    phpS() {
      // let sss = JSON.stringify(Object.assign({}, this.pozOt.arNPOZot,this.pozOt.arNPOZgvs ))
      let sss = JSON.stringify(this.pozOt);
      return sss;
    },
    optionso() {
      let opt = [];
      opt = [
        {
          text: "нет",
          value: "0"
        },
        {
          text: "15",
          value: "15"
        },
        {
          text: "25",
          value: "25"
        },
        {
          text: "32",
          value: "32"
        },
        {
          text: "40",
          value: "40"
        },
        {
          text: "50",
          value: "50"
        },
        {
          text: "65",
          value: "65"
        },
        {
          text: "80",
          value: "80"
        },
        {
          text: "100",
          value: "100"
        },
        {
          text: "150",
          value: "150"
        },
        {
          text: "200",
          value: "200"
        },
        {
          text: "300",
          value: "300"
        }
      ];
      return opt;
    },
    disButKP() {
      let empt = "";
      let c6 = "";
      if (this.isx.di1 == "0" && this.isx.di3 == "0") {
        empt = 1;
      } else {
        empt = 0;
      }
      if (this.check6.y1 || this.check6.y3 || this.check6.y4) {
        c6 = 1;
      } else {
        c6 = 0;
      }
      let f = empt + c6;
      if (f > 0) {
        return true;
      } else {
        return false;
      }
    },
    select_T2() {
      let im = "И6";
      let dim = this.isx.di1;
      let dtr = this.isx.dut2;
      if (this.isx.tipIMo == 5) {
        im = "К5";
      }
      if (+this.isx.di1 === 0) {
        dim = "нет";
      }
      if (+this.isx.dut2 === 0) {
        dtr = "";
      }
      return {
        im: im,
        dim: dim,
        dtr: dtr
      };
    },
    disablOtkr() {
      let diso = true;
      let disg = true;
      if (this.isx.qco > 0 && this.isx.qmax > 0) {
        if (this.isx.sx_gvs_dep > 0) {
          this.$store.dispatch("actdisotkr", 0);
          diso = true;
        } else {
          diso = false;
        }
        if (this.isx.sx_otkr < 2) {
          disg = false;
        } else {
          disg = true;
        }
      }
      return {
        diso: diso,
        disg: disg
      };
    },
    ml() {
      let o = false;
      let g = false;
      if (this.isx.tipLo == "ml" && this.isx.di1) {
        if (this.isx.di1 > 80 || this.isx.di1 < 32) {
          o = true;
        }
      }
      if (this.isx.tipLg == "ml" && (this.isx.di3 > 0 || this.isx.di4 > 0)) {
        if (
          ((this.isx.di3 > 80 || this.isx.di3 < 32) && this.isx.di3 > 0) ||
          ((this.isx.di4 > 80 || this.isx.di4 < 32) && this.isx.di4 > 0)
        ) {
          g = true;
        }
      }
      return {
        o: o,
        g: g
      };
    },
    grz() {
      let o = false;
      let g = false;
      if (this.isx.dut1 < 33 && this.isx.di1 > 0 && this.isx.filo == 2) {
        o = true;
      }
      if (
        ((this.isx.dut3 < 33 && this.isx.di3 > 0) ||
          (this.isx.dut4 < 33 && this.isx.di4 > 0)) &&
        this.isx.filg == 2
      ) {
        g = true;
      }
      return {
        o: o,
        g: g
      };
    },
    speed() {
      let are = {};
      let sp = [
        this.rescalc.gdr1.V,
        this.rescalc.gdr9.V,
        this.rescalc.gdr3.V,
        this.rescalc.gdr4.V
      ];
      sp.forEach(function(el, i) {
        if (el > 1.5) {
          are["v" + i] = false;
        } else {
          are["v" + i] = true;
        }
      });
      return are;
    },
    popup() {
      return {
        qm: "Qмакс = Qср * Kчн",
        qs: "Qср = Qмакс / Kчн",
        kc: "коэффициент часовой неравномерности <br> Kчн = Qмакс / Qср",
        r:
          "Данный параметр необходим для подбора датчиков температуры.<br> При Ду ИМ менее 50, датчики устанавливаются в расширение Ду65.",
        s: "Скорость потока в ИМ больше 1,5 м/с,",
        d: "диап. Ду ИМ И6: 25 - 80",
        m: "диап. Ду ИМ для модифиц. линий: 32 - 80"
      };
    },
    diptr() {
      let du = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300];
      let duu1 = [];
      let dd1 = [];
      let duu9 = [];
      let duu3 = [];
      let duu4 = [];
      let d1 = +this.isx.di1;
      let d9 = +this.isx.di9;
      let d3 = +this.isx.di3;
      let d4 = +this.isx.di4;
      let A1 = du.indexOf(d1);
      let A9 = du.indexOf(d9);
      let A3 = du.indexOf(d3);
      let A4 = du.indexOf(d4);
      let duk1 = du.slice(A1, A1 + 4);
      let duk9 = du.slice(A9, A9 + 4);
      let duk3 = du.slice(A3, A3 + 4);
      let duk4 = du.slice(A4, A4 + 4);
      duk1.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu1.push(h);
        dd1.push(el);
      });
      duk9.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu9.push(h);
      });
      duk3.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu3.push(h);
      });
      duk4.forEach(function(el) {
        let h = {
          text: el,
          value: el
        };
        duu4.push(h);
      });
      // console.log(d1,d9,d3,d4)
      return {
        duu1,
        duu9,
        duu3,
        duu4,
        dd1
      };
    },
    check6() {
      let du = [25, 32, 40, 50, 65, 80];
      let d1 = +this.isx.di1;
      let d9 = +this.isx.di9;
      let d3 = +this.isx.di3;
      let d4 = +this.isx.di4;
      let A1 = du.indexOf(d1);
      let A9 = du.indexOf(d9);
      let A3 = du.indexOf(d3);
      let A4 = du.indexOf(d4);
      let y1 = "";
      let y3 = "";
      let y4 = "";
      if (+this.isx.tipIMo == 6) {
        if (A1 >= 0 || !d1) {
          y1 = false;
        } else {
          y1 = true;
        }
      } else {
        y1 = false;
      }
      if (this.isx.tipIMg3 == 6) {
        if (A3 >= 0 || !d3) {
          y3 = false;
        } else {
          y3 = true;
        }
      } else {
        y3 = false;
      }
      if (this.isx.tipIMg4 == 6) {
        if (A4 >= 0 || !d4) {
          y4 = false;
        } else {
          y4 = true;
        }
      } else {
        y4 = false;
      }
      return {
        y1,
        y3,
        y4
      };
    },
    imgsx() {
      let z = "10";
      let z1 = "";
      let zz = "";
      let bf7 = 1;
      let bf8 = 0;
      let v1 = 0;
      let v2 = 0;
      let v3 = 0;
      let tipu = this.tipProject;
      let z2 = this.isx.sx_ot;
      let z3 = this.isx.sx_otkr;
      let z4 = this.isx.sx_gvs;

      switch (tipu) {
        case "o":
          z1 = "1";
          z = z1 + z2;
          zz = "ЦО";
          if (this.check6.y1 || this.ml.o) {
            v1 = 1;
          } else {
            v1 = 0;
          }
          if (this.isx.dut1 < 33 && this.isx.filo == "2") {
            v2 = 1;
          } else {
            v2 = 0;
          }
          bf8 = v1 + v2;
          if (bf8 > 0) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }
          break;
        case "g":
          z1 = "2";
          z = z1 + z4;
          zz = "ГВС";
          if (this.check6.y3 || this.check6.y4 || this.ml.g) {
            v1 = 1;
          } else {
            v1 = 0;
          }
          if (
            (this.isx.dut3 < 33 && this.isx.di3 > 0 && this.isx.filg == "2") ||
            (this.isx.dut4 < 33 && this.isx.di4 > 0 && this.isx.filg == "2")
          ) {
            v2 = 1;
          } else {
            v2 = 0;
          }
          if (this.isx.di4 > 0 && this.isx.tipIMg3 !== this.isx.tipIMg4) {
            v3 = 1;
          } else {
            v3 = 0;
          }
          bf8 = v1 + v2 + v3;
          if (bf8 > 0) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }
          break;
        case "og":
          if (this.isx.sx_gvs_dep < 1) {
            if (this.isx.sx_otkr < 2) {
              zz = "ЦО + ГВС";
            } else {
              zz = "TC";
            }
          } else {
            zz = "ИТП";
            z4 = +this.isx.sx_gvs_dep + 3;
          }

          z1 = "3";
          z = z1 + z2 + z3 + z4;

          if (
            this.check6.y1 ||
            this.check6.y3 ||
            this.check6.y4 ||
            this.ml.o ||
            this.ml.g
          ) {
            v1 = 1;
          } else {
            v1 = 0;
          }
          if (
            (this.isx.dut1 < 33 && this.isx.filo == "2") ||
            (this.isx.dut3 < 33 && this.isx.di3 > 0 && this.isx.filg == "2") ||
            (this.isx.dut4 < 33 && this.isx.di4 > 0 && this.isx.filg == "2")
          ) {
            v2 = 1;
          } else {
            v2 = 0;
          }

          if (this.isx.di4 > 0 && this.isx.tipIMg3 !== this.isx.tipIMg4) {
            v3 = 1;
          } else {
            v3 = 0;
          }

          // console.log('v1 = ',v1 )
          // console.log('v2 = ',v2 )
          // console.log('v3 = ',v3 )
          bf8 = v1 + v2 + v3;

          if (bf8 > 0) {
            bf7 = 1;
          } else {
            bf7 = 0;
          }

          break;
        default:
          zz = "";
          bf7 = 1;
          break;
      }
      let sx = "./build/img/" + z + ".svg";
      // console.log('sx',sx)
      return {
        sx,
        zz,
        bf7
      };
    },
    tipProject() {
      let tipu = this.isx.tipuu;
      if (this.isx.qco > 0 && this.isx.qmax > 0) {
        tipu = "og";
      } else if (this.isx.qco > 0) {
        tipu = "o";
      } else if (this.isx.qmax > 0) {
        tipu = "g";
      } else {
        tipu = "";
      }
      return tipu;
    },
    tipKP() {
      let tipk = "";
      if (this.isx.di1 > 0 && this.isx.di3 > 0) {
        tipk = "og";
      } else if (this.isx.di1 > 0) {
        tipk = "o";
      } else if (this.isx.di3 > 0) {
        tipk = "g";
      } else {
        tipk = "";
      }
      return tipk;
    },
    fu_Co() {
      if (this.isx.sx_otkr < 1) {
        return false;
      } else {
        this.$store.dispatch("change_fuCo", 1);
        return true;
      }
    }
  },

  methods: {
    proj(m, u) {
      let tip_rascheta = "";
      let tipu = this.tipProject;
      this.$store.dispatch("tipuz", tipu);
      let kp = this.tipKP;
      this.$store.dispatch("tipkp", kp);

      switch (m) {
        case "qco":
          this.$store.dispatch("actnum", this.isx.qco);
          if (this.isx.qco > 0) {
            this.$store.dispatch("change_pr_ot", 1);
          }
          if (this.isx.tipLo == "ml") {
            this.fo = true;
            this.$store.dispatch("filO", 0);
          } else {
            this.fo = false;
          }
          tip_rascheta = "ot";
          break;
        case "qmax":
          this.$store.dispatch("actqs", this.isx.qmax);
          this.$store.dispatch("change_pr_gvs", 1);
          this.$store.dispatch("actGVSto", "0");
          this.stup = false;
          if (this.isx.tipLg == "ml") {
            this.fg = true;
            this.$store.dispatch("filG", 0);
          } else {
            this.fg = false;
          }
          tip_rascheta = "gvs";
          break;
        case "qgvssr":
          this.$store.dispatch("actqm", this.isx.qgvssr);
          this.$store.dispatch("change_pr_gvs", 1);
          this.$store.dispatch("actGVSto", "0");
          tip_rascheta = "gvs";
          break;
        case "itp0":
          this.stup = false;
          this.$store.dispatch("actGVSto", "0");
          tip_rascheta = "ot_gvs";
          break;
        case "itp1":
          this.stup = true;
          this.$store.dispatch("actGVSto", 1);
          tip_rascheta = "ot_gvs";
          break;
        case "itp2":
          this.stup = true;
          this.$store.dispatch("actGVSto", 2);
          tip_rascheta = "ot_gvs";
          break;
        case "wgvs0":
          this.stup = false;
          this.$store.dispatch("tupik", 0);
          if (this.isx.sx_otkr < 1) {
            this.$store.dispatch("change_fuCo", 0);
          }
          tip_rascheta = "ot_gvs";
          break;
        case "wgvs1":
          this.stup = false;
          this.$store.dispatch("tupik", 0);
          tip_rascheta = "ot_gvs";
          break;
        case "wgvs2":
          this.stup = true;
          this.$store.dispatch("tupik", 0);
          tip_rascheta = "ot_gvs";
          break;
        case "wgvs3":
          this.stup = true;
          this.$store.dispatch("tupik", 1);
          tip_rascheta = "ot_gvs";
          break;
        case "sx_ot0":
          this.$store.dispatch("actPodp", 0);
          tip_rascheta = "ot";
          break;
        case "sx_ot1":
          tip_rascheta = "ot";
          break;
        default:
          break;
      }
      if (u) {
        this.$store.dispatch("change_tip_im4", this.isx.tipIMg3);
      }

      if (this.disablOtkr.diso) {
        this.$store.dispatch("actdisotkr", 0);
      }

      let result = clc_pr(this.isx, 1.5, m, 0, tip_rascheta);
      this.$store.dispatch({
        type: "actrescalc",
        result: result
      });
      this.im4 = false;
    },
    rash(d) {
      let R = 0;
      let R4 = 0;
      switch (d) {
        case "t1":
          R = this.rescalc.gdr1.Gv;
          this.$store.dispatch("change_pr_ot", 0);
          if (R > 0) {
            //вычисляем Ду прибора
            let result = clc_kp(R, 1.5, d, "", "", "");
            this.$store.dispatch({
              type: "actpeR",
              result: result,
              d: d
            });
            //проверяю Ду трубы
            let ch1 = this.dipTR(this.isx.di1, this.isx.dut1);
            if (ch1) {
              this.$store.dispatch({
                type: "truba",
                res: +this.isx.di1,
                t: "t1"
              });
            }
          } else {
            this.$store.dispatch("act_ot_null", "");
          }
          break;
        case "t3":
          R = this.rescalc.gdr3.Gv;
          this.im4 = false;
          this.$store.dispatch("change_pr_gvs", 0);
          //пересчитываем отопление если открытая схема
          if (this.isx.sx_otkr) {
            this.$store.dispatch("actdisotkr", 0);
            let reslt = clc_pr(this.isx, 1.5, "t1", R, "ot");
            this.$store.dispatch({
              type: "actrescalc",
              result: reslt
            });
            this.im4 = false;
          }
          this.$store.dispatch("tupik", 0);

          if (R > 0) {
            //вычисляем Ду прибора
            let result = clc_kp(R, 1.5, d, "", "", "");
            this.$store.dispatch({
              type: "actpeR",
              result: result,
              d: d
            });

            //проверяю Ду трубы
            let ch3 = this.dipTR(this.isx.di3, this.isx.dut3);
            if (ch3) {
              this.$store.dispatch({
                type: "truba",
                res: +this.isx.di3,
                t: "t3"
              });
            }
          } else {
            this.$store.dispatch("act_gvs_null", "");
          }
          break;
        // case 't9':
        // R = this.rescalc.gdr9.Gv;
        // break;
      }
      let tipu = this.tipProject;
      this.$store.dispatch("tipuz", tipu);

      let kp = this.tipKP;
      this.$store.dispatch("tipkp", kp);
    },
    change_du(d, h) {
      let R = "";
      let tipo = this.isx.pr_ot;
      let tipg = this.isx.pr_gvs;

      switch (d) {
        case "t1":
          if (+this.isx.di1 > 0) {
            let ch = this.dipTR(this.isx.di1, this.isx.dut1);
            if (ch) {
              this.$store.dispatch({
                type: "truba",
                res: +this.isx.di1,
                t: "t1"
              });
            }

            if (tipo === 1) {
              let result = clc_pr(this.isx, 1.5, "peres", "", "ot");
              this.$store.dispatch({
                type: "actrescalc",
                result: result
              });
              this.im4 = false;
            } else {
              R = this.rescalc.gdr1.Gv;
              if (R > 0) {
                let result = clc_kp(R, 1.5, d, "peres", this.isx.di1, "");
                this.$store.dispatch({
                  type: "actpeR",
                  result: result,
                  d: d
                });
              }
            }
          } else {
            this.$store.dispatch("change_pr_ot", 0);
            this.$store.dispatch("act_ot_null", "dutrnull");
          }
          break;
        case "t3":
          if (+this.isx.di3 > 0) {
            let ch = this.dipTR(this.isx.di3, this.isx.dut3);
            if (ch) {
              this.$store.dispatch({
                type: "truba",
                res: +this.isx.di3,
                t: "t3"
              });
            }
            if (tipg === 1) {
              let result = clc_pr(this.isx, 1.5, "peres", "", "gvs");
              this.$store.dispatch({
                type: "actrescalc",
                result: result
              });
            } else {
              R = this.rescalc.gdr3.Gv;
              if (R > 0) {
                let result = clc_kp(R, 1.5, d, "peres", this.isx.di3, "");
                this.$store.dispatch({
                  type: "actpeR",
                  result: result,
                  d: d
                });
              }
            }
            this.im4 = false;
          } else {
            this.$store.dispatch("change_pr_gvs", 0);
            this.$store.dispatch("act_gvs_null", "dutrnull");
            this.im4 = true;
            if (this.isx.sx_otkr) {
              this.$store.dispatch("actdisotkr", 0);
              let reslt = clc_pr(this.isx, 1.5, "t1", R, "ot");
              this.$store.dispatch({
                type: "actrescalc",
                result: reslt
              });
            }
            this.$store.dispatch("actdisotkr", 0);
          }

          break;
        case "t4":
          if (+this.isx.di4 > 0) {
            let ch = this.dipTR(this.isx.di4, this.isx.dut4);
            if (ch) {
              this.$store.dispatch({
                type: "truba",
                res: +this.isx.di4,
                t: "t4"
              });
            }
            this.$store.dispatch("tupik", 0);
            if (tipg === 1) {
              let result = clc_pr(this.isx, 1.5, "peres", "", "gvs");
              this.$store.dispatch({
                type: "actrescalc",
                result: result
              });
              this.im4 = false;
            } else {
              R = this.rescalc.gdr4.Gv;
              if (R > 0) {
                let result = clc_kp(R, 1.5, d, "peres", this.isx.di4, "");
                this.$store.dispatch({
                  type: "actpeR",
                  result: result,
                  d: d
                });
              }
            }
          } else {
            // переключаем на тупик
            this.$store.dispatch("tupik", 1);
            if (tipg === 1) {
              let result = clc_pr(this.isx, 1.5, "peres", "", "gvs");
              this.$store.dispatch({
                type: "actrescalc",
                result: result
              });
              this.im4 = false;
            }
          }

          break;
        case "t9":
          if (+this.isx.di9 > 0) {
            let ch = this.dipTR(this.isx.di9, this.isx.dut9);
            if (ch) {
              this.$store.dispatch({
                type: "truba",
                res: +this.isx.di9,
                t: "t9"
              });
            }
            if (tipo === 1) {
              let result = clc_pr(this.isx, 1.5, "peres", "", "ot");
              this.$store.dispatch({
                type: "actrescalc",
                result: result
              });
              this.im4 = false;
            } else {
              R = this.rescalc.gdr9.Gv;
              if (R > 0) {
                let result = clc_kp(R, 1.5, d, "peres", this.isx.di9, "");
                this.$store.dispatch({
                  type: "actpeR",
                  result: result,
                  d: d
                });
              }
            }
          } else {
            this.$store.dispatch("actPodp", 0);
          }
          break;
      }
      let tipu = this.tipProject;
      this.$store.dispatch("tipuz", tipu);

      let kp = this.tipKP;
      this.$store.dispatch("tipkp", kp);
    },
    dipTR(du_im, du_tr) {
      let du = [15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150, 200, 250, 300];
      let k1 = du.indexOf(+du_im);
      let k11 = du.indexOf(+du_tr);
      if (!du_tr || k1 > k11 || k11 - k1 > 3) {
        return true;
      } else {
        return false;
      }
    },
    ImageSPL() {
      let fileSPL = document.getElementById("fileImageSPL").files.length;
      let filePrSx = document.getElementById("fileImagePrSx").files.length;
      if (fileSPL === 0) {
        this.otklFormatSPL = true;
      } else {
        this.otklFormatSPL = false;
      }
      if (filePrSx === 0) {
        this.otklFormatPrSx = true;
      } else {
        this.otklFormatPrSx = false;
      }
    },
    onOk() {
      let ee = "";
      if (this.top || this.bottom) {
        ee = false;
      } else {
        ee = true;
      }
      this.$store.dispatch("actOKP", ee);
      this.show = false;
    },
    customLabel(option) {
      return ` ${option.plt}`;
    },
    cre() {
      this.$store.dispatch("actkch", this.isx.kch);
      this.$store.dispatch("actqm", null);
      this.$store.dispatch("actqs", null);
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    nasp() {
      if (this.isx.selReg != 0) {
        this.mess = [];
        let asd = [];

        axios
          .post("./pdf/project/regions.php", {
            sReg: this.isx.selReg
          })
          .then(response => {
            response.data.forEach(item => {
              asd.push({
                item
              });
            });
            this.$store.dispatch("actnas", asd);
          })

          .catch(function(error) {
            console.log(error);
          });
      } else {
        let asd = [];
        this.$store.dispatch("actnas", asd);
      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

