import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyDateTime'
})
export class FriendlyDateTimePipe implements PipeTransform {

  transform(stamp: string): string {
    return this.format(stamp);
  }

  format(stamp: string): string {
    const units = [
      { name: ' วินาที', value: 1000, max: 50, single: 'วินาที' },
      { name: ' นาที', value: 60000, max: 50, single: 'นาที' },
      { name: ' ชั่วโมง', value: 3600000, max: 22, single: 'ชั่วโมง' },
      { name: ' วัน', value: 86400000, max: 6, single: 'เมื่อวาน' },
      { name: ' สัปดาห์', value: 604800000, max: 3.5, single: 'อาทิตย์' },
      { name: ' เดือน', value: 2592000000, max: 11, single: 'เดือน' },
      { name: ' ปี', value: 31536000000, max: Infinity, single: 'ปี' }
    ];

    var date = new Date(stamp);
    var now = new Date();
    var diff = now.getTime() - date.getTime();

    var future = diff < 0;
    diff = Math.abs(diff);

    if (!future && diff < 10000) return 'เพิ่งผ่านไปไม่นาน';
    if (future && diff < 5000) return 'แว๊บ ๆ';

    var suffix = future ? ' ข้างหน้าจากนี้' : 'ที่แล้ว';

    for (var i = 0; i < units.length; i++) {
      var unit = units[i];

      if (diff <= unit.max * unit.value) {
        var t = Math.round(diff / unit.value);
        if (unit.name == 'day' && t === 1) {
          return unit.single;
        }
        return t === 1 ? `${unit.single}${suffix}` : `${t} ${unit.name}${suffix}`;
      }
    }
  }

}
